require('dotenv/config');

// const path = require('path');
const fs = require('node:fs'); // File System

let rawConfigData = fs.readFileSync('./src/data/config.json');
console.log('File Read..');
let config = JSON.parse(rawConfigData);

// Class Imports


const commandsDirectory = './src/commands';

const client = require('../src/classes/Client');
const Command = require('../src/classes/Command');


client.once('ready', () => {
	console.log('The bot is ready.');

	fs.readdir(commandsDirectory, (error, files) => {
		if (error) {
			return console.error(`Unable to read directory:\n${commandsDirectory}`);
		}
		files.filter(file => file.endsWith('.js')).forEach((current_file) => {
			/**
			 * @type {Command}
			 */
			const command = require(`./commands/${current_file}`);

			client.commands.set(command.name, command);
		});
	});
});

client.once('messageCreate', (message) => {

	if (!message.content.startsWith(config.prefix)) {return;}

	const commandArguments = message.content.substring(config.prefix.length).split(/ +/);

	const command = client.commands.find((cmd) => cmd.name == commandArguments[0]);
	if (!command) {return;}

	command.run(message, commandArguments, client);

});

client.login(process.env.BOT_TOKEN);
