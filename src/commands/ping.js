const Command = require('../classes/Command');



module.exports = new Command({
	name: 'ping',
	description: 'Shows the latency of the bot',
	async run(message, args, client) {
		message.reply(`Ping: ${client.ws.ping}ms`);
	}
});