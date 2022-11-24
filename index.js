const fs = require('node:fs');
const path = require('node:path');
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
} = require('discord.js');
const { token, clientId, guildId } = require('./config.json');
const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('js'));

// creates new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

// import commands from files
for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "excute" property`,
    );
  }
}

// set up interation listener ->
client.on(Events.InteractionCreate, async (interaction) => {
  // console.log(interaction);

  if (!interaction.isChatInputCommand()) {
    console.log('this is a slash command');
    //discord.com/api/oauth2/authorize?client_id=1044775867722768464permissions=8&scope=bot%20applications.commands
  }

  const command = interaction.client.commands.get(interaction.commandName);
  console.log('here');

  if (!command)
    console.error(`No command matching ${interaction.commandName} was found`);

  try {
    console.log('trying to reply');
    // await interaction.reply({
    //   content: 'sup fucker',
    //   ephemeral: true,
    // });
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

// only runs once client is ready
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  console.log(c.guilds);
});

client.login(token);
