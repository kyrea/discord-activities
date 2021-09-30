require("dotenv").config();
const Client = require("./src/Client");

const client = new Client({
  partials: ["MESSAGE", "REACTION"],
  presence: {
    status: "offline",
    activities: [{ name: "activities", type: "PLAYING" }],
  },
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"],
});

client.login(process.env.BOT_TOKEN);
