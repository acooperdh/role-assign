const { SlashCommandBuilder } = require('discord.js');
const { connectToDb } = require('../api/checkUser.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information about the user.'),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    // console.log('user who made commmand');
    // console.log(interaction.member.roles.cache);
    const result = await connectToDb();
    console.log(result);
    const member = interaction.member; // GuildMember
    console.log(interaction.client.guilds.cache);
    const user = interaction.user; // User
    console.log('member', member);
    console.log('user', user);
    console.log(user.tag);
    const roleIds = interaction.member.roles.cache.map((role) => role.name);
    console.log(roleIds);
    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`,
    );
  },
};
