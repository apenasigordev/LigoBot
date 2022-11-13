import {Client, GatewayIntentBits} from 'discord.js'

import tmi from 'tmi.js'

const Twitch = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
        reconnect: true,
        secure: true
  },
  identity: {
        username: `${process.env.TWITCH_USERNAME}`,
        password: `oauth:${process.env.TWITCH_OAUTH}`
  },
	channels: [ 'ligofer0' ]
});

Twitch.connect();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});


client.on("ready", async function() {
  console.log(`Bot ${client.user.tag} online.`)

  client.user.setActivity({
    name: "Ligofer é fedido"
  })
})

Twitch.on('message', (channel, tags, message, self) => {
	client.channels.cache.get("1041444414888878170").send(`${tags['display-name']}: ${message}`)
});

Twitch.on("subscription", (channel, username, method, message, userstate) => {
   client.channels.cache.get("1041166525610074218").send({
     embeds: [{
       title: "Novo sub!",
       description: `${username} agora é novo sub!`,
       
     }]
   })
});
                          
client.on("messageCreate", (message) => {
  // console.log(message)
  if(message.author.bot) return;

  if(message.channel.id === "1041444414888878170") {
    Twitch.say("ligofer0", message.content)
  }

})


client.login()
export default client;
