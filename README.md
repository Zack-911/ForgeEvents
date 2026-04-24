# forge.events

Custom user-defined events for ForgeScript. Define, fire, and listen to your own events with full Discord context forwarding.

## Install

```bash
npm install github:zack-911/forgeevents
```

## Usage

```ts
import { ForgeClient } from '@tryforge/forgescript'
import { ForgeEvents } from 'forgeevents'

const events = new ForgeEvents({
    events: [
        { name: 'onPurchase', fields: ['userId', 'item', 'price'] },
        { name: 'dailyReset' },
        { name: 'userBanned', fields: ['userId', 'reason', 'moderatorId'] },
    ],
})

const client = new ForgeClient({
    token: process.env.BOT_TOKEN,
    intents: ['Guilds', 'GuildMessages', 'MessageContent'],
    prefixes: ['!'],
    events: ['messageCreate'],
    extensions: [events],
})

// Register handlers
events.commands.add({
    type: 'onPurchase',
    code: '<@$eventData[userId]> bought $eventData[item] for $eventData[price] coins!',
})

// Fire from ForgeScript
client.commands.add({
    name: 'buy',
    type: 'messageCreate',
    code: '$fireEvent[onPurchase;userId:$authorID;item:Sword;price:100]',
})

// Or fire from TypeScript
await events.registry.fire('onPurchase', { userId: '123', item: 'Sword', price: '100' }, message)

client.login()
```

## Functions

| Function | Description |
|---|---|
| `$fireEvent[name;key:value;...]` | Fire a custom event with optional data |
| `$eventData[key;default?]` | Get a field value from the current event |
| `$eventName` | Get the name of the current event |
| `$eventFiredAt` | Get the ISO timestamp the event fired |
| `$eventExists[name]` | Check if an event is defined |
| `$eventFields[name;sep?]` | List declared fields for an event |
| `$eventList[sep?]` | List all defined event names |