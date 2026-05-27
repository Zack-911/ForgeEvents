"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: '$eventExists',
    description: 'Returns whether a custom event with the given name is defined.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'eventName',
            description: 'The event name to check.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [eventName]) {
        const ext = ctx.client.getExtension(__1.ForgeEvents, true);
        return this.success(String(ext.registry.has(eventName)));
    },
});
//# sourceMappingURL=eventExists.js.map