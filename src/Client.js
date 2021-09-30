const { Client, Collection } = require("discord.js");
const Util = require("./structures/Util");
const { DiscordTogether } = require("discord-together");

module.exports = class Bot extends Client {
  constructor(options = {}) {
    super(options);

    this.commands = new Collection();
    this.events = new Collection();
    this.utils = new Util(this);
    this.discordTogether = new DiscordTogether(this);
  }

  async login(token) {
    this.utils.loadCommands();
    this.utils.loadEvents();
    super.login(token);
  }
};
