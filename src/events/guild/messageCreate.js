const Event = require("../../structures/Event");

module.exports = class messageCreate extends Event {
  async run(message) {
    try {
      if (!message.guild || message.author.bot) return;
      if (
        message.mentions.users.has(this.bot.user.id) &&
        message.content === `<@!${this.bot.user.id}>`
      ) {
        return message.channel.send(
          "Hi, I only listen to slash commands! Type `/activity`"
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
};
