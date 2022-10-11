require("dotenv").config();
const path = require("path");
const fs = require("fs");

/**
 * @param {Client} client
 */

async function LoadCommands(client) {
  const commandFiles = fs.readdirSync(
    `${path.dirname(require.main.filename)}${path.sep}src/commands`
  );
  for (const file of commandFiles) {
    const command = require(`${path.dirname(require.main.filename)}${
      path.sep
    }src/commands/${file}`);
    client.commands.set(command.data.name, command);
    client.slashCommands.push(command.data.toJSON());
    //  console.log(`[LOADED]: Command - ${file}`);
  }
}

async function LoadEvents(client) {
  fs.readdir(
    `${path.dirname(require.main.filename)}${path.sep}src/events`,
    async (err, files) => {
      if (err)
        return console.error(
          `An Error Occcured While Loading Events. ${err.stack}`
        );

      if (!files)
        return console.warn(`[WARN]: Event Folder Doesn't have any files.`);

      for (let i = 0; i < files.length; i++) {
        const event = require(`${path.dirname(require.main.filename)}${
          path.sep
        }src/events/${files[i]}`);
        let eventName = files[i].split(".")[0];
        if (event.once)
          client.once(eventName, (...args) => event.execute(...args, client));
        else client.on(eventName, (...args) => event.execute(...args, client));
        // console.log(`[LOADED]: Event - ${files[i]}`);
      }
    }
  );
}

module.exports = { LoadCommands, LoadEvents };
