import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile = mutation({
  args: {
    name: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    console.log("identity", identity?.tokenIdentifier);
    if (!identity) {
      throw new ConvexError("You must be logged in to upload a file");
    }

    await ctx.db.insert("files", {
      name: args.name,
    });
  },
});

export const getFiles = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    console.log("identity", identity?.tokenIdentifier);

    if (!identity) {
      return [];
    }
    return await ctx.db.query("files").collect();
  },
});
