import * as bcrypt from "bcryptjs";
import authoriaztion from "../utils/auth";

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
    // 1.lowercase their email
    args.email = args.email.toLowerCase();
    // 2.hash their password
    const password = await bcrypt.hash(args.password, 10);
    // 3.create user in database
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

    // 4.Auth the user
    await authoriaztion(user, ctx);

    // 5.return user

    return user;
  },
  async login(parent, args, ctx, info) {
    // Deconstruct the email and password
    const { email, password } = args;

    // 1.Check is there is user with that email
    const user = await ctx.db.query.user({
      where: {
        email
      }
    });

    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }

    // 2.Check their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid Password!");
    }
    // 3.Auth the user
    await authoriaztion(user, ctx);

    // 5.return the user
  }
};

export default Mutation;
