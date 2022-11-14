import {Client, GatewayIntentBits} from 'discord.js'

import tmi from 'tmi.js'
import { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus} from '@discordjs/voice'

import './server'

import { TwitchChannel } from "twitch-channel";

const channel = new TwitchChannel({
  channel: "ligofer0",
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret
});

const Twitch = new tmi.Client({
  options: {  },
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
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});


client.on("ready", async function() {
  console.log(`Bot ${client.user.tag} online.`)

    
  client.user.setActivity({
    name: "Ligofer é fedido"
  })
})

channel.on("follow", (follower) => {
  console.log(follower)
  const channel = client.channels.cache.get("1041500932036366426")

    const connection = joinVoiceChannel({
	    channelId: channel.id,
	    guildId: channel.guild.id,
	    adapterCreator: channel.guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer();
    const resource = createAudioResource(`https://audio.aapenasigordev.repl.co/speech?text=${follower.viewerName}%20deu%20follow%20no%20canal!&lang=pt`);
    
    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
	 connection.destroy()
});
})

Twitch.on('message', (channel, tags, message, self) => {
	client.channels.cache.get("1041444414888878170").send(`${tags['display-name']}: ${message}`)
});
Twitch.on('message', (channel, tags, message, self) => {
	if(self || !message.startsWith('!')) return;

	const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();

	if(command === 'echo') {
    const channel = client.channels.cache.get("1041500932036366426")

    const connection = joinVoiceChannel({
	    channelId: channel.id,
	    guildId: channel.guild.id,
	    adapterCreator: channel.guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer();
    const resource = createAudioResource(`https://audio.aapenasigordev.repl.co/speech?text=${args.join(' ')}&lang=pt`);
    
    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
	 connection.destroy()
});
    
		// Twitch.say("ligofer0", `@${tags.username}, você disse: "${args.join(' ')}"`);
	}
});

Twitch.on("subscription", (ch, username, method, message, userstate) => {
   client.channels.cache.get("1041166525610074218").send({
     embeds: [{
       title: "Novo sub!",
       description: `${username} agora é novo sub!`,
       
     }]
   })
  const channel = client.channels.cache.get("1041500932036366426")

    const connection = joinVoiceChannel({
	    channelId: channel.id,
	    guildId: channel.guild.id,
	    adapterCreator: channel.guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer();
    const resource = createAudioResource(`https://audio.aapenasigordev.repl.co/speech?text=${username}%20agora%20é%20sub!&lang=pt`);
    
    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
	 connection.destroy()
});
});

          
client.on("messageCreate", (message) => {
  // console.log(message)
  if(message.author.bot) return;

  if(message.channel.id === "1041444414888878170") {
    message.delete();
    Twitch.say("ligofer0", message.content)
  }
  if(!message.content.startsWith('!')) return;

	const args = message.content.slice(1).split(' ');
	const command = args.shift().toLowerCase();
  if(command === "echo") {
    const channel = client.channels.cache.get("1041500932036366426")

    const connection = joinVoiceChannel({
	    channelId: channel.id,
	    guildId: channel.guild.id,
	    adapterCreator: channel.guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer();
    const resource = createAudioResource(`https://audio.aapenasigordev.repl.co/speech?text=${args.join(' ')}&lang=pt`);
    
    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
	 connection.destroy()
});
  }
})


client.login()
export default client;
