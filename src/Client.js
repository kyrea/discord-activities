const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  REST,
  Routes,
} = require("discord.js");
const { LoadCommands, LoadEvents } = require("./structures/Utils");
const { DiscordTogether } = require("discord-together");

class Bot extends Client {
  /**
   * @param { import ('discord.js').ClientOptions } props;
   */

  constructor(props) {
    if (!props) props = {};

    props.presence = {
      status: "online",
    },
    props.partials = [Partials.Message, Partials.Reaction],
    props.intents = [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
    ];
    super(props);
    this.discordTogether = new DiscordTogether(this);
  }

  _init() {
    this.config = process.env;
    if (!this.config.BOT_TOKEN)
      return console.error(`[ERROR] : No Token provided in Config file.`);

    this.commands = new Collection();
    this.slashCommands = [];

    LoadCommands(this);
    LoadEvents(this);

    const rest = new REST({ version: "10" }).setToken(this.config.BOT_TOKEN);

    (async () => {
      try {
        console.log(
          `Started refreshing ${this.slashCommands.length} application (/) commands.`
        );

        if (!this.config.BOT_ID) {
          console.error(
            `[ERROR] : Failed to reloaded application (/) commands. Please provide a BOT ID.`
          );
        } else {
          const data = await rest.put(
            Routes.applicationCommands(this.config.BOT_ID),
            { body: this.slashCommands }
          );
          console.log(
            `Successfully reloaded ${data.length} application (/) commands.`
          );
        }
      } catch (error) {
        console.error(error);
      }
    })();

    this.login(this.config.BOT_TOKEN).catch(() => {
      console.error(`[ERROR] : Invalid Token provided.`);
    });
  }
}

module.exports.Bot = Bot;
