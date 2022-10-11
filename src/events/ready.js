const { Bot } = require("../Client");
/**
 * @param { Bot } client
 */

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`[API] : Logged in as ${client.user.username}`);
  },
};
