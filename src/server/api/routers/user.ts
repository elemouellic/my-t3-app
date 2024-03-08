import {type Prisma} from "@prisma/client";
import {createTRPCRouter, protectedProcedure,} from "~/server/api/trpc";
import {TRPCError} from "@trpc/server";

export const userRouter = createTRPCRouter({
    getGuilds: protectedProcedure.query(async ({ctx}) => {
        // Get the user's connected account
        const account = await ctx.db.account.findFirstOrThrow({
            where: {
                userId: ctx.session.user.id,
                provider: "discord"
            },

        } as Prisma.AccountFindFirstArgs);

        // Check the Token
        if(!account.access_token) {
            throw new TRPCError({
                message: "No access token found",
                code: "UNAUTHORIZED"
            });
        }

        return await ctx.discord.getUserGuilds(account.access_token);

    })
});