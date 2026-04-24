import { ForgeClient } from '@tryforge/forgescript'
import { ForgeEvents } from '..'

const events = new ForgeEvents({
    events: [
        {
            name: 'onPurchase',
            description: 'Fired when a user buys something.',
            fields: ['userId', 'item', 'price'],
        },
        {
            name: 'dailyReset',
            description: 'Fired every day at midnight to reset stats.',
        },
        {
            name: 'userBanned',
            description: 'Fired when a user is banned.',
            fields: ['userId', 'reason', 'moderatorId'],
        },
    ],
})

const client = new ForgeClient({
    token: process.env.BOT_TOKEN,
    intents: ['Guilds', 'GuildMessages', 'MessageContent'],
    prefixes: ['!'],
    events: ['messageCreate'],
    extensions: [events],
})

events.commands.add({
    type: 'onPurchase',
    code: '📦 <@$eventData[userId]> bought **$eventData[item]** for **$eventData[price]** coins!',
})

events.commands.add({
    type: 'dailyReset',
    code: '🔄 Daily reset triggered at $eventFiredAt',
})

events.commands.add({
    type: 'userBanned',
    code: '🔨 <@$eventData[userId]> was banned by <@$eventData[moderatorId]> — $eventData[reason]',
})

client.commands.add({
    name: 'test',
    type: 'messageCreate',
    code: `
        $log[hello]
        $fireEvent[onPurchase;userId:$authorID;item:Magic Sword;price:500]
    `,
})

client.commands.add({
    name: 'eval',
    type: 'messageCreate',
    code: `
        $onlyForUsers[;$botOwnerID]
        $eval[$message]
    `
})

// Fire from your own code:
// await events.registry.fire('dailyReset')
// await events.registry.fire('userBanned', { userId: '123', reason: 'Spamming', moderatorId: '456' }, message)

client.login()
