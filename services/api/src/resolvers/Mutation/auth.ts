import * as bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

// Helper Functions
import { promisify } from "util";
import { mailFormate, transport } from "../../../mail/mail";
import {
  createAccessToken,
  createRefreshToken,
} from "../../utils/authorization";
import hasPermission from "../../utils/hasPermission";
import isAuth from "../../utils/isAuth";
import { sendRefreshToken } from "../../utils/sendRefreshToken";
import verifyUserName from "../../utils/verifyUserName";

export const authMutations = {
  async signup(parent, args, ctx, info) {
    // 1 => lowercase their email
    args.email = args.email.toLowerCase();

    // 2 => hash their password
    const password = await bcrypt.hash(args.password, 10);

    // 3 => check username contains symbol except "_" and add "@" at beggining
    verifyUserName(args);

    // 4 => create user in database
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        permissions: { set: ["USER"] },
      },
    });

    // 5 => Auth the user
    // send `refreshToken` as coockie
    // send `accessToken` as query data

    sendRefreshToken(ctx.response, createRefreshToken(user));

    // 6.return user
    return { user, accessToken: createAccessToken(user) };
  },

  async signin(parent, args, ctx, info) {
    // Deconstruct the email and password
    const { email, password } = args;

    // 1 => Check is there is user with that email
    const user = await ctx.db.query.user({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }

    // 2 => Check their password is correct

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid Password!");
    }

    // 3 => Auth the user
    // send `refreshToken` as coockie
    // send `accessToken` as query data

    sendRefreshToken(ctx.response, createRefreshToken(user));

    // 5.return the user
    return { user, accessToken: createAccessToken(user) };
  },

  signout(parent, args, ctx, info) {
    try {
      ctx.response.clearCookie("_euid", {
        domain: process.env.DOMAIN,
        path: "/",
      });
      return { message: "Logout Successfully" };
    } catch (error) {
      throw new Error(error);
    }
  },

  async resetPasswordRequest(parent, args, ctx, info) {
    // 1. Check if this is a real user
    const user = await ctx.db.query.user({
      where: {
        email: args.email,
      },
    });

    if (!user) {
      throw new Error(`No such user found for email ${args.email}`);
    }
    // 2. Reset token and expiry on that user
    try {
      const randomBytesPromisified = promisify(randomBytes);
      const resetToken = (await randomBytesPromisified(20)).toString("hex");
      const resetTokenExpiry = (Date.now() + 3600000).toString(); // 1 hour from now

      const res = await ctx.db.mutation.updateUser({
        where: {
          email: args.email,
        },
        data: { resetToken, resetTokenExpiry },
      });

      // 3.Email them that reset token
      const mailRes = await transport.sendMail({
        from: "kaiz@eggy.com",
        to: user.email,
        subject: "Your Password Reset Token",
        html: mailFormate(
          `Your Password reset token is here! \n\n <a href="${
          process.env.FRONTEND_URL
          }/signin/reset?token=${resetToken}">Click here to reset</a>`
        ),
      });
      // 4.Return the message
      return { message: "thanks" };
    } catch (error) {
      throw new Error(error);
    }
  },

  async resetPassword(parent, args, ctx, info) {
    // 1 => Check the password match
    if (args.password !== args.confirmPassword) {
      throw new Error("Password don't match");
    }

    // 2 => Check if its a rigit token reset
    // 3 => Check if its expired
    const resetTokenExpiry = (Date.now() - 3600000).toString(); // reset expiry

    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: resetTokenExpiry,
      },
    });

    if (!user) {
      throw new Error("This token is invalid or expired");
    }

    // 4 => Hash their new password
    const password = await bcrypt.hash(args.password, 10);

    // 5 => save the new password to the user and remove  old sesetToken Fields
    const updatedUser = await ctx.db.mutation.updateUser({
      where: {
        email: user.email,
      },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    // 6 => Auth the user
    // send `refreshToken` as coockie
    // send `accessToken` as query data

    sendRefreshToken(ctx.response, createRefreshToken(user));

    // 7 => return user
    return { user: updatedUser, accessToken: createAccessToken(user) };
  },

  async updatePermissions(parent, args, ctx, info) {
    // 1. check if they are logged in
    isAuth(ctx);

    // 2. Query the current user
    const currentuser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId,
        },
      },
      `{
        permissions
      }`
    );

    // 3. Check if they have permission to do this
    hasPermission(currentuser, ["ADMIN", "PERMISSIONUPDATE"]);

    // 4. update the permission
    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions,
          },
        },
        where: {
          id: args.userId,
        },
      },
      info
    );
  },

  async revokeRefreshTokenForUser(parent, args, ctx, info) {
    // 1. check if they are logged in
    isAuth(ctx);

    // 2. Query the current user
    const currentuser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId,
        },
      },
      `{
        permissions
      }`
    );

    // 3. Check if they have permission to do this
    hasPermission(currentuser, ["ADMIN"]);

    // 4. Query the user that Session will be Revoked
    const revokeUser = await ctx.db.query.user(
      {
        where: {
          id: args.userId,
        },
      },
      `{
        tokenVersion
      }`
    );

    // 5. Revoke all session
    const tokenVersion: number = revokeUser.tokenVersion + 1;

    // 6. send updated user
    return ctx.db.mutation.updateUser(
      {
        data: {
          tokenVersion,
        },
        where: {
          id: args.userId,
        },
      },
      info
    );
  },
};
