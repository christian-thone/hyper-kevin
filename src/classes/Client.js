const DiscordJS = require('discord.js');
const { Intents } = DiscordJS;

const Command = require('./Command');

const intents = {
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES
	]
};


class Client extends DiscordJS.Client {
	constructor(options) {
		super({ intents });
		/**
		 * @type {DiscordJS.Collection<string, Command>}
		 * */
		this.commands = new DiscordJS.Collection();
	}
}

module.exports = Client;