"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: '$fireEvent',
    description: 'Fires a custom event, running all commands registered for it. ' +
        'The Discord context is automatically forwarded from the calling command ' +
        'so all ForgeScript context functions work in handlers.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'eventName',
            description: 'The name of the event to fire.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'data',
            description: 'Key-value pairs in the format key:value.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: true,
        },
    ],
    output: forgescript_1.ArgType.Number,
    async execute(ctx, [eventName, rawData]) {
        const ext = ctx.client.getExtension(__1.ForgeEvents, true);
        if (!ext.registry.has(eventName)) {
            return this.customError(`Unknown event "${eventName}". ` +
                `Defined events: ${ext.registry.getAll().map((e) => e.name).join(', ')}`);
        }
        const data = {};
        for (const pair of rawData.filter(Boolean)) {
            const colon = pair.indexOf(':');
            if (colon === -1) {
                return this.customError(`Invalid data format "${pair}". Expected "key:value".`);
            }
            data[pair.slice(0, colon).trim()] = pair.slice(colon + 1);
        }
        try {
            const ran = await ext.registry.fire(eventName, data, ctx.obj);
            return this.success(String(ran));
        }
        catch (err) {
            return this.customError(err.message);
        }
    },
});
//# sourceMappingURL=fireEvent.js.map