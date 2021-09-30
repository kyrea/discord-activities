const Event = require("../../structures/Event");

module.exports = class Ready extends Event {
  constructor(...args) {
    super(...args, {
      once: true,
    });
  }

  async run() {
    try {
      let slashCommands = this.bot.commands.filter(
        (command) => command.slashCommand
      );
      let data = [];

      for (const [key, value] of slashCommands) {
        data.push({
          name: key,
          description: value.description,
          options: value.commandOptions,
        });
      }

      await this.bot.application.commands.set(data);
      console.log(`${this.bot.user.username} is now online!`);
    } catch (error) {
      console.error(error);
    }
  }
};
