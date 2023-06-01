# Interstellar Discord Bot

`Interstellar Discord Bot` is a Node.js-based bot script that allows you to easily control and manage your Discord bot from the command line. The script provides a terminal-based interface where you can start, stop, restart, and refresh your bot, as well as view system and bot stats.

## Features

- Start, stop, restart, and refresh your Discord bot with simple keystrokes
- View system information such as server uptime, total memory, CPU cores, and OS info
- Monitor bot uptime, memory usage, and status (`Online`/`Offline`)
- Colorful terminal interface with box borders and formatted text using `Chalk` library

## Requirements

- `Node.js` (v14 or higher)
- `NPM` (Node Package Manager)

## Installation

1. Clone or download this repository.
2. Install the required packages by running the following command: npm install


3. Replace the bot file path in `startBot()` function with the correct path to your bot's main file.
4. Run the script using Node.js: node start.js


## Usage

Once the script is running, you can control the bot using the following keystrokes:

- `S` - Start Bot
- `X` - Stop Bot
- `R` - Restart Bot
- `L` - Refresh Console

You can also press `Ctrl+C` to stop the bot and exit.

## Customize

Feel free to customize the script according to your needs. You can modify the colors, text formatting, or add additional functionality to suit your bot's requirements.

## License

This project is licensed under the `MIT License`.
