const Command = require("../structures/Command");

module.exports = class Invite extends Command {
  constructor(...args) {
    super(...args, {
      name: "invite",
      description: "Get the invite link for me.",
      slashCommand: true,
    });
  }

  async run(interaction) {
    try {
      interaction.reply({
        content: `[Click here to invite!](https://discord.com/api/oauth2/authorize?client_id=893159124701941802&permissions=1&scope=bot%20applications.commands)`,
      });
    } catch (error) {
      console.error(error);
      return interaction.reply(`An Error Occurred: \`${error.message}\`!`);
    }
  }
};
