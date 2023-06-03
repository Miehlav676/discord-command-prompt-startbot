# Miehlav start bot

`Interstellar Discord Bot` is a Node.js-based bot script that allows you to easily control and manage your Discord bot from the command line. The script provides a terminal-based interface where you can start, stop, restart, and refresh your bot, as well as view system and bot stats.

## Features

- Start, stop, restart, and refresh your Discord bot with simple keystrokes
- View system information such as server uptime, total memory, CPU cores, and OS info
- Monitor bot uptime, memory usage, and status (`Online`/`Offline`)
- Colorful terminal interface with box borders and formatted text using `Chalk` library

![Alt Text](https://who.likes-throwing.rocks/64A0JswaP.png)
![Alt Text](https://who.likes-throwing.rocks/64A169plq.png)
![Alt Text](https://who.likes-throwing.rocks/64A1KD3M1.png)

## Requirements

- [Node.js](https://nodejs.org/) (v14 or higher)
- [NPM](https://www.npmjs.com/) (Node Package Manager)

Please note that the package `child_process` is a built-in module in Node.js, so you don't need to install it separately. This is just in case.

## Installation

1. Clone or download this repository.
2. Install the required packages by running the following command: `npm install`.
3. Run the script using Node.js: once you have finished setting everything up to your liking, simply double click the `startbot.bat` file.
4. To install the required packages, run the following command:

npm install blessed
npm install chalk
npm install child_process
npm install os
npm install moment
npm install figlet
npm install fs
npm install path

## Errors

- If you get an error, it's possible you need to change [this line](https://github.com/Miehlav676/discord-command-prompt-startbot/blob/main/README.md#L41) to your bot's main path.

- Downgrade to a CommonJS-compatible version of the library. Some libraries, such as Chalk, have recently switched to ESM-only. You can downgrade to an older version of the library that still supports CommonJS.

![Alt Text](https://who.likes-throwing.rocks/64uVRjBfx.png)

## Usage

Once the script is running, you can control the bot using the following keystrokes:

- `S` - Start Bot
- `X` - Stop Bot
- `R` - Restart Bot
- `L` - Refresh Console

You can also press `Ctrl+C` to stop the bot and exit.

## Customize

// Modify the bot's default prefix: let prefix = "'"; // Default prefix

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

## Support and Error Reporting

If you encounter any issues or errors while using the Interstellar Discord Bot, please do the following:

1. Check the [documentation](https://github.com/Miehlav676/discord-command-prompt-startbot/blob/main/README.md) and make sure the error is not due to a misunderstanding of how to use the bot.
2. Check the [issue tracker](https://github.com/Miehlav676/discord-command-prompt-startbot/issues) on the GitHub repository to see if the issue has already been reported. If it has, you can add any additional information you have, or simply follow the issue for updates.
3. If the issue has not been reported yet, please create a new issue in the issue tracker, providing as much detail as possible. Include any error messages you receive, what you were doing when the error occurred, and any other information that might be relevant.

You can also reach out to me directly for help:

Discord Username: `Canada#1234`

## License

This project is licensed under the `MIT License`.
