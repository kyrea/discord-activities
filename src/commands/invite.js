const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Get the invite link for me."),
  async execute(interaction, client) {
    try {
      await interaction.reply({
        content: `[Click here to invite!](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1&scope=bot%20applications.commands)`,
      });
    } catch (error) {
      console.error(error);
      return interaction.reply(`An Error Occurred: \`${error.message}\`!`);
    }
  },
};
