// Helper Functions
import checkFlavor from "../../utils/checkFlavor";
import checkCursor from "../../utils/checkCursor";
import { invokeRenderLambdaFunction } from "../../aws/lambda/render";

export const cursorMutations = {
  // ################################################ CREATE CURSOR ################################################

  async createCursor(parent, args, ctx, info) {
    // seprate flavorId and cursor data
    const flavorId = args.flavorId;
    delete args.flavorId;

    // Checking user has permissions or not if not then throw Error
    await checkFlavor(ctx, flavorId, ["ADMIN", "CURSORCREATE"]);

    const [data] = await ctx.db.query.cursors(
      {
        where: { name: args.name }
      },
      info
    );

    if (data) {
      throw new Error("Cursor is already Available");
    }

    const cursor = await ctx.db.mutation.createCursor(
      {
        data: {
          // Provide relationship between Flavor and Cursor
          flavor: {
            connect: {
              id: flavorId
            }
          },
          ...args
        }
      },
      info
    );

    return cursor;
  },

  // ################################################ UPDATE CURSOR ################################################

  async updateCursor(parent, args, ctx, info) {
    // separate data from args
    const cursorId = args.id;
    delete args.id;

    // Checking user has permissions or not if not then throw Error
    await checkCursor(ctx, cursorId, ["ADMIN", "CURSORUPDATE"]);

    // return updated cursor by id
    return ctx.db.mutation.updateCursor(
      {
        where: {
          id: cursorId
        },
        data: { ...args }
      },
      info
    );
  },
  // ################################################ RENAME CURSOR ################################################
  async renameCursor(parent, args, ctx, info) {
    // Checking user has permissions or not if not then throw Error
    await checkCursor(ctx, args.id, ["ADMIN", "CURSORUPDATE"]);

    let updateCursor: any;

    // separate id from args
    const cursorId = args.id;
    delete args.id;
    const flavorId = args.flavorId;
    delete args.flavorId;

    const [data] = await ctx.db.query.cursors(
      {
        where: { name: args.name, flavor: { id: flavorId } }
      },
      info
    );
    // if cursor already available
    if (data) {
      // Same Cursor so do nothing
      if (data.id === cursorId) {
        updateCursor = data;
      } else {
        throw new Error("Cursor already available");
      }
    }
    // Normal Rename
    else {
      // TODO Update S3 files
      updateCursor = ctx.db.mutation.updateCursor(
        {
          where: {
            id: cursorId
          },
          data: { ...args }
        },
        info
      );
    }

    // return updated cursor by id
    return updateCursor;
  },

  // ################################################ DELETE CURSOR ################################################

  async deleteCursor(parent, args, ctx, info) {
    // separate id from args
    const cursorId = args.id;
    delete args.id;

    // Checking user has permissions or not if not then throw Error
    // await checkCursor(ctx, cursorId, ["ADMIN", "CURSORDELETE"]);

    // Delete flavor by id
    return ctx.db.mutation.deleteCursor({ where: { id: cursorId } }, info);
  },

  async renderCursor(parent, args, ctx, info) {
    // deconstruct id from args
    const { id } = args;

    const cursor = await ctx.db.query.cursor(
      { where: { id } },
      `{
        name
        frames
        source {
          key
        }
    }`
    );

    if (!cursor) {
      throw new Error("Cursor not Found");
    }

    if (!cursor!.source) {
      throw new Error("source file not found for this cursor");
    }

    // data of cursor
    const {
      name,
      frames,
      source: { key }
    } = cursor;

    // configure render path ../render/*.png in s3
    let destKey = key.split(name)[0];
    destKey = destKey.replace("source", "render");

    // Prepare render payload
    const payload = {
      srcKey: key,
      destKey,
      frames
    };

    // -------------- Invoke Render Lambda Function --------------
    const response: any = await invokeRenderLambdaFunction(
      JSON.stringify(payload)
    );

    // If any error in lambda execution
    // @ts-ignore
    if (!response.StatusCode === 200) {
      throw new Error("Ooops.Render server generating Exception");
    }

    let { Payload: data } = response;
    data = JSON.parse(data);

    // Checking lambda have manual Ecxeption or not
    if (data.statusCode) {
      throw new Error(data.body);
    }

    // Sotore lambda response data to prisma
    // if data alredy exits then it overwrite or create new one
    await Promise.all(
      data.map(async (image: any) => {
        // tslint:disable-next-line: no-return-await
        return await ctx.db.mutation.upsertRenderFile({
          where: {
            url: image.url
          },
          update: {
            ...image
          },
          create: {
            cursor: {
              connect: { id }
            },
            ...image
          }
        });
      })
    );

    // Update Cursor render flag
    return ctx.db.mutation.updateCursor(
      { where: { id }, data: { isRendered: true } },
      info
    );
  }
};
