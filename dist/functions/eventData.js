"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$eventData',
    description: 'Returns a field value from the data passed to the currently executing custom event. Only valid inside event handler commands.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'key',
            description: 'The field key to retrieve.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'default',
            description: 'Value to return if the key does not exist in the event data.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.String,
    execute(ctx, [key, fallback]) {
        const payload = ctx.runtime.extras;
        if (!payload?.data) {
            return this.customError('$eventData can only be used inside a custom event handler command.');
        }
        const value = payload.data[key];
        if (value === undefined) {
            return fallback !== null && fallback !== undefined
                ? this.success(fallback)
                : this.success();
        }
        return this.success(value);
    },
});
//# sourceMappingURL=eventData.js.map