const path = require("path");
const { promisify } = require("util");
const glob = promisify(require("glob"));
const Command = require("./Command");
const Event = require("./Event");

module.exports = class Util {
  constructor(bot) {
    this.bot = bot;
  }

  async loadCommands() {
    return glob(
      `${path.dirname(require.main.filename)}${path.sep}src/command/*.js`
    ).then((commands) => {
      for (const commandFile of commands) {
        delete require.cache[commandFile];
        const { name } = path.parse(commandFile);
        const File = require(commandFile);
        const command = new File(this.bot, name.toLowerCase());
        if (!(command instanceof Command))
          throw new TypeError(`Command ${name} doesnt belong in Commands.`);
        this.bot.commands.set(command.name, command);
      }
    });
  }

  async loadEvents() {
    return glob(
      `${path.dirname(require.main.filename)}${path.sep}src/events/**/*.js`
    ).then((events) => {
      for (const eventFile of events) {
        delete require.cache[eventFile];
        const { name } = path.parse(eventFile);
        const File = require(eventFile);
        const event = new File(this.bot, name.toLowerCase());
        if (!(event instanceof Event))
          throw new TypeError(`Event ${name} doesn't belong in Events`);
        this.bot.events.set(event.name, event);
        event.emitter[event.type](name, (...args) => event.run(...args));
      }
    });
  }
};
