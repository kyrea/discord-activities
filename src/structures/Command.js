module.exports = class Command {
  constructor(bot, name, options = {}) {
    this.bot = bot;
    this.name = options.name || name;
    this.description = options.description || "No Description";
    this.slashCommand = options.slashCommand || false;
    this.commandOptions = options.commandOptions || [];
  }

  async run(interaction) {
    throw new Error(`Command ${this.name} doesn't provide a run method!`);
  }
};
