export interface DiscordEventContext {
    obj: object;
}
export interface CustomEventDefinition {
    name: string;
    description?: string;
    fields?: string[];
}
export interface CustomEventPayload {
    eventName: string;
    data: Record<string, string>;
    firedAt: string;
    discordCtx: DiscordEventContext;
}
//# sourceMappingURL=types.d.ts.map