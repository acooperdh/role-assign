const { Client, Events, GatewayInitBits } = require('discord.js');
const { token } = require('./config.json');

// creates new client instance
const client = new Client({ intents: [GatewayInitBits.Guilds] });

// only runs once client is ready
client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(token);