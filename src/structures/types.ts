import type { Guild, BaseChannel, GuildMember, User } from 'discord.js'

// ─── Discord context ──────────────────────────────────────────────────────────

export interface DiscordEventContext {
    guild: Guild | null
    channel: BaseChannel | null
    member: GuildMember | null
    user: User | null
}

// ─── Custom event definition ──────────────────────────────────────────────────

export interface CustomEventDefinition {
    /** The event name. Must be unique. Only letters, numbers, underscores. */
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
