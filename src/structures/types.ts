import type { Guild, BaseChannel, GuildMember, User } from 'discord.js'

// ─── Discord context ──────────────────────────────────────────────────────────

export interface DiscordEventContext {
    /**
     * The raw Discord.js object set as ctx.obj in Interpreter.run.
     * Context property getters (guild, channel, user, message, member) derive
     * from this object, so passing the original Message/Interaction here makes
     * every ForgeScript context function work correctly in event handlers.
     */
    obj: object
}

// ─── Custom event definition ──────────────────────────────────────────────────

export interface CustomEventDefinition {
    name: string
    description?: string
    fields?: string[]
}

// ─── Runtime payload ──────────────────────────────────────────────────────────

export interface CustomEventPayload {
    eventName: string
    data: Record<string, string>
    firedAt: string
    discordCtx: DiscordEventContext
}
