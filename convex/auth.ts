import Resend from "@auth/core/providers/resend";
import { convexAuth } from "@convex-dev/auth/server";
import type { MutationCtx } from "./_generated/server";
import { getUserByEmail } from "./users";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.AUTH_EMAIL ?? "Namesake <no-reply@namesake.fyi>",
    }),
  ],

  callbacks: {
    async createOrUpdateUser(ctx: MutationCtx, args) {
      // Handle merging updated fields into existing user
      if (args.existingUserId) {
        return args.existingUserId;
      }

      // Handle account linking
      if (args.profile.email) {
        const existingUser = await getUserByEmail(ctx, {
          email: args.profile.email,
        });
        if (existingUser) return existingUser._id;
      }

      // Create a new user with defaults
      return ctx.db.insert("users", {
        email: args.profile.email,
        emailVerified: args.profile.emailVerified ?? false,
        role: "user",
        theme: "system",
      });
    },
  },
});
