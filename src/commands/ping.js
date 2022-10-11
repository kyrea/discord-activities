const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong! What else would it do anyways"),
  async execute(interaction) {
    await interaction.reply({
      content: "Pong!",
      ephemeral: true,
    });
  },
};
