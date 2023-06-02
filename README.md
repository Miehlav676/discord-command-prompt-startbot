# Interstellar Discord Bot

`Interstellar Discord Bot` is a Node.js-based bot script that allows you to easily control and manage your Discord bot from the command line. The script provides a terminal-based interface where you can start, stop, restart, and refresh your bot, as well as view system and bot stats.

## Features

- Start, stop, restart, and refresh your Discord bot with simple keystrokes
- View system information such as server uptime, total memory, CPU cores, and OS info
- Monitor bot uptime, memory usage, and status (`Online`/`Offline`)
- Colorful terminal interface with box borders and formatted text using `Chalk` library
![Alt Text](https://who.likes-throwing.rocks/64tHoW7Ij.png)
![Alt Text](https://who.likes-throwing.rocks/64tHXgZw4.png)
![Alt Text](https://who.likes-throwing.rocks/64tVFgOZc.png)

## Requirements

- `Node.js` (v14 or higher)
- `NPM` (Node Package Manager)
- npm install blessed@latest
- npm install chalk@4.1.0
- npm install moment@latest
- npm install figlet@latest


## Installation

1. Clone or download this repository.
2. Install the required packages by running the following command: npm install
3. Run the script using Node.js: once you have finished settings everything up simply click the startbot.bat 

## Errors

- if you get an error its possible you need to change this line to your bots main path.
![Alt Text](https://who.likes-throwing.rocks/64uNfdBOs.png)

- Downgrade to a CommonJS-compatible version of the library. Some libraries, such as Chalk, have recently switched to ESM-only. You can downgrade to an older version of the library that still supports CommonJS

![Alt Text](https://who.likes-throwing.rocks/64uVRjBfx.png)

## Usage

Once the script is running, you can control the bot using the following keystrokes:

- `S` - Start Bot
- `X` - Stop Bot
- `R` - Restart Bot
- `L` - Refresh Console

You can also press `Ctrl+C` to stop the bot and exit.

## Customize

// Modify the bot's command prefix:
// Replace the '$' with your desired prefix.
`${chalk.magenta('Bot Prefix:')} ${chalk.green('$')}\n`

// Modify the bot's username:
// Replace 'InterstellarBot#1234' with your bot's username.
let botUsername = 'InterstellarBot#1234';

// Modify the bot's command and system stats display:
// This is where the content of the display box is set.
// Modify this to change how the box's contents are arranged or to add additional information.
box.setContent(`...`);

// Change how the bot is started:
// Replace 'node' and ['index.cjs'] with your bot's startup command and its arguments.
bot = spawn('node', ['index.cjs'], {...});

Check out these customization possibilities directly in the code:

- [Modifying bot's command prefix](https://github.com/Miehlav676/discord-command-prompt-startbot/blob/main/README.md#L162)
- [Modifying bot's username](https://github.com/Miehlav676/discord-command-prompt-startbot/blob/main/README.md#L62)
- [Modifying the bot's command and system stats display](https://github.com/Miehlav676/discord-command-prompt-startbot/blob/main/README.md#L163)
- [Changing how the bot is started](https://github.com/Miehlav676/discord-command-prompt-startbot/blob/main/README.md#L135)

Feel free to customize the script according to your needs. You can modify the colors, text formatting, or add additional functionality to suit your bot's requirements.

## License

This project is licensed under the `MIT License`.
