// ─── Discord context ──────────────────────────────────────────────────────────

export interface DiscordEventContext {
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
