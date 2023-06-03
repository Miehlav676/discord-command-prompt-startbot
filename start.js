const blessed = require('blessed');
const chalk = require('chalk');
const { spawn } = require('child_process');
const os = require('os');
const moment = require('moment');
const figlet = require('figlet');
const fs = require('fs');
const path = require('path');

// Create a screen object.
const screen = blessed.screen({
  smartCSR: true,
  title: 'Miehlav'
});

// Create a box that fills the entire screen.
const box = blessed.box({
  top: 0,
  left: 0,
  width: '80%',
  height: '100%-1',
  content: '',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: '#98c379' // Green color for the box border
    },
  }
});

// Create a console box at the top right.
const consoleBox = blessed.box({
  top: 0,
  right: 0,
  width: '20%',
  height: '100%-1',
  content: '{underline}Console{/underline}',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: '#98c379' // Green color for the console box border
    },
  }
});

// Append our boxes to the screen.
screen.append(box);
screen.append(consoleBox);

let bot = null;
let botStartTime = null;
let lastButtonUsed = null;
let botStatus = 'Offline';
let botUsername = 'Miehlav'; // Replace with your bot's username

const commandsFolderPath = path.join(__dirname, 'commands');

let prefix = "'"; // Replace with your bots prefix Default prefix.
let commandsCount = 0; // Store the commands count

// Function to start the Discord bot.
function startBot() {
  if (bot) {
    writeToConsole(chalk.red('Bot is already running. Please stop the bot first.'));
    return;
  }

  // Modify this line to start your bot with the correct command and arguments
  bot = spawn('node', ['index.cjs'], {
    cwd: 'C:/Users/Miehl/Desktop/Interstellar', // Adjust the path to your project folder
    stdio: ['pipe', 'pipe', 'pipe', 'pipe', 'pipe', 'pipe', process.stderr],
    env: { ...process.env, PREFIX: prefix } // Set the PREFIX environment variable to the prefix value
  });

  botStartTime = moment();
  botStatus = 'Online';

  updateStats(); // Update the box content with system and bot stats
  lastButtonUsed = 'S';

  bot.on('error', (err) => {
    writeToConsole(chalk.red(`Error starting bot: ${err.message}`));
  });

  // Pipe the bot's stdout and stderr to the console
  bot.stdout.on('data', (data) => {
    writeToConsole(data.toString());
  });

  bot.stderr.on('data', (data) => {
    writeToConsole(chalk.red(data.toString()));
  });
}

// Function to stop the Discord bot.
function stopBot() {
  if (!bot) {
    writeToConsole(chalk.red('Bot is not running. Please start the bot first.'));
    return;
  }

  writeToConsole(chalk.red('Stopping bot...'));

  bot.kill();
  bot = null;
  botStatus = 'Offline';
  lastButtonUsed = 'X';

  botStartTime = null; // Reset the bot's start time

  setTimeout(() => {
    updateStats(); // Update the box content with system and bot stats after stopping the bot
  }, 1000);
}

// Function to restart the Discord bot.
function restartBot() {
  stopBot();

  setTimeout(() => {
    startBot();
    writeToConsole(chalk.green('Bot restarted successfully.'));
  }, 2000);
}

// Function to write to the console.
function writeToConsole(data) {
  consoleBox.setContent(consoleBox.content + data + '\n'); // Append data with a line break
  screen.render();

  const commandsLoadedMatch = data.match(/Commands Loaded: (\d+)/);
  if (commandsLoadedMatch) {
    const newCommandsCount = parseInt(commandsLoadedMatch[1]);
    if (newCommandsCount !== commandsCount) {
      commandsCount = newCommandsCount;
      updateStats(commandsCount);
    }
  }

  const prefixMatch = data.match(/Changing prefix to: (.+)/);
  if (prefixMatch) {
    const newPrefix = prefixMatch[1].trim();
    if (newPrefix !== prefix) {
      prefix = newPrefix;
      updateStats(commandsCount);
    }
  }
}

// Function to update the box content with system and bot stats
function updateStats(commandsCount = 0) {
  const systemUptime = serverUptime(os.uptime()); // Get the operating system's uptime

  const uptime = botStartTime ? moment().diff(botStartTime, 'seconds') : 0;
  const systemStats = `${chalk.magenta('System Stats')}\n` +
    `Platform: ${os.platform()}\n` +
    `CPU: ${os.cpus()[0].model}\n` +
    `Memory: ${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB\n` +
    `Uptime: ${systemUptime}\n\n`;

  const botMemoryUsage = process.memoryUsage().heapUsed / (1024 * 1024); // Bot's RAM usage in MB

  const prefixDisplay = botStatus === 'Online' ? prefix : 'No prefix';

  box.setContent(`${title}\n\n` +
    `${chalk.magenta('♨ Bot Status:')} ${botStatus === 'Online' ? chalk.green(botStatus) : chalk.red(botStatus)}\n\n` +
    `${chalk.magenta('Bot Prefix:')} ${chalk.green(prefixDisplay)}\n` +
    `${chalk.magenta('Bot Username:')} ${chalk.green(botUsername)}\n\n` +
    `${chalk.magenta('Server Uptime:')} ${chalk.green(systemUptime)}\n` +
    `${chalk.magenta('Total Memory:')} ${chalk.green(`${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB`)}\n` +
    `${chalk.magenta('Bot Uptime:')} ${chalk.green(serverUptime(uptime))}\n` +
    `${chalk.magenta('Bot Memory Usage:')} ${chalk.green(`${botMemoryUsage.toFixed(2)} MB`)}\n` +
    `${chalk.magenta('CPU Cores:')} ${chalk.green(os.cpus().length)}\n` +
    `${chalk.magenta('OS Info:')} ${chalk.green(`${os.platform()} (${os.release()})`)}\n\n` +
    `${chalk.magenta('Commands:')}\n` +
    `${chalk.green('S')} - ${chalk.magenta('Start Bot')}\n` +
    `${chalk.green('X')} - ${chalk.magenta('Stop Bot')}\n` +
    `${chalk.green('R')} - ${chalk.magenta('Restart Bot')}\n` +
    `${chalk.green('L')} - ${chalk.magenta('Refresh Console')}\n` +
    `${chalk.magenta('Last Button Used:')} ${chalk.green(lastButtonUsed || 'None')}\n\n` +
    `${chalk.magenta('Commands Loaded:')} ${chalk.green(commandsCount)}\n\n` +
    `${chalk.magenta('Press')} ${chalk.green('Ctrl+C')} ${chalk.magenta('to exit.')}`
  );
  screen.render();
}

// Function to format server uptime in human-readable format
function serverUptime(uptime) {
  const duration = moment.duration(uptime, 'seconds');
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  return uptimeString;
}

// Generate the ASCII art title
const title = chalk.magentaBright(figlet.textSync('Miehlav', { font: 'Standard', horizontalLayout: 'default' }));

// Handle key events
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0);
});

screen.key(['s'], function (ch, key) {
  startBot();
});

screen.key(['x'], function (ch, key) {
  stopBot();
});

screen.key(['r'], function (ch, key) {
  restartBot();
});

screen.key(['l'], function (ch, key) {
  consoleBox.setContent('{underline}Console{/underline}');
  screen.render();
});

// Set layout and positioning of boxes
screen.append(box);
box.position.width = '80%';

screen.append(consoleBox);
consoleBox.position.width = '20%';
consoleBox.position.right = 0;

// Initial rendering
box.setContent(title);
updateStats();

// Render the screen
screen.render();

// Enable the mouse for the screen
screen.enableMouse();

// Enable input for the screen
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0);
});

// Auto-update stats every second
setInterval(() => {
  updateStats(commandsCount);
}, 1000);
