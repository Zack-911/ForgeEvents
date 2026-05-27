"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: '$eventFields',
    description: 'Returns a separated list of the declared field names for a custom event.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'eventName',
            description: 'The event name.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'separator',
            description: 'Separator between field names. Defaults to ", ".',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.String,
    execute(ctx, [eventName, separator]) {
        const ext = ctx.client.getExtension(__1.ForgeEvents, true);
        const def = ext.registry.get(eventName);
        if (!def)
            return this.customError(`Unknown event "${eventName}".`);
        return this.success((def.fields ?? []).join(separator ?? ', '));
    },
});
//# sourceMappingURL=eventFields.js.map