import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const Mutation = {
  async createEgg(parent, args, ctx, info) {
    //TODO check it logged In
    const egg = await ctx.db.mutation.createEgg(
      {
        data: {
          ...args
        }
      },
      info
    );

    // console.log(egg);

    return egg;
  },
  updateEgg(parent, args, ctx, info) {
    // first take copy in updates
    const updates = { ...args };
    // remove id from updates
    delete updates.id;
    // run the update Query
    return ctx.db.mutation.updateEgg(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },

  async deleteEgg(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1.find egg
    // const egg = await ctx.db.Query.egg({ where }, `{id title}`);
    // 2.check they own the egg ,or  have a permission
    // TODO
    // 3.Delete It
    return ctx.db.mutation.deleteEgg({ where }, info);
  },

  async signup(parent, args, ctx, info) {
    // lowercase their email
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create user in database
    let user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permission: { set: ["USER"] }
        }
      },
      info
    );

    // create the JWT Token for them
    const token = await jwt.sign({ _uid: user.id }, process.env.APP_SECRET);

    // set jwt token as cookie on the response
    ctx.response.cookie("auth", token, {
      domain: process.env.DOMAIN,
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year Cookie
    });

    // finnaly return user

    return user;
  }
};

export default Mutation;
