"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeEvents = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const path_1 = __importDefault(require("path"));
const commandManager_1 = require("./structures/commandManager");
const EventRegistry_1 = require("./structures/EventRegistry");
class ForgeEvents extends forgescript_1.ForgeExtension {
    constructor(options) {
        super();
        this.options = options;
        this.name = 'ForgeEvents';
        this.description = 'Custom user-defined events for ForgeScript.';
        this.version = require('../package.json').version;
        this.registry = new EventRegistry_1.EventRegistry();
        if (!options.events?.length) {
            throw new Error('[ForgeEvents] You must define at least one event in the options.');
        }
    }
    init(client) {
        var _a;
        this.client = client;
        this.commands = new commandManager_1.ForgeEventsCommandManager(client);
        this.registry.boot(client, this.commands, this.options.events);
        (_a = forgescript_1.EventManager.Loaded)['ForgeEvents'] ?? (_a['ForgeEvents'] = {});
        for (const def of this.options.events) {
            forgescript_1.EventManager.Loaded['ForgeEvents'][def.name] = {
                name: def.name,
                data: {
                    name: def.name,
                    version: '1.0.0',
                    description: def.description ?? `Custom event: ${def.name}`,
                },
                register: () => void 0,
            };
        }
        this.client.events.load('ForgeEvents', this.options.events.map(e => e.name));
        this.load(path_1.default.join(__dirname, './functions'));
        forgescript_1.Logger.info(`[ForgeEvents] ${this.options.events.length} event(s) registered: ` +
            this.options.events.map(e => e.name).join(', '));
    }
}
exports.ForgeEvents = ForgeEvents;
__exportStar(require("./structures"), exports);
//# sourceMappingURL=index.js.map