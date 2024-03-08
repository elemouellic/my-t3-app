import Discord from "discord-oauth2";
import { env } from "~/env.js";
const globalForDiscord = globalThis as unknown as { discord: Discord };
export const discord =
    globalForDiscord.discord ||
    new Discord();
if (env.NODE_ENV !== "production") globalForDiscord.discord = discord;
