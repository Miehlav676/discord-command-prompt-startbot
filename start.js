const blessed = require('blessed');
const chalk = require('chalk');
const { spawn } = require('child_process');
const os = require('os');
const moment = require('moment');
const figlet = require('figlet');

// Create a screen object.
const screen = blessed.screen({
  smartCSR: true,
  title: 'Interstellar Discord Bot'
});

// Create a box that fills the entire screen.
const box = blessed.box({
  top: 0,
  left: 0,
  width: '80%',
  height: '100%',
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
  height: '100%',
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
let botUsername = 'InterstellarBot#1234'; // Replace with your bot's username

// Function to start the Discord bot.
function startBot() {
  if (bot) {
    writeToConsole(chalk.red('Bot is already running. Please stop the bot first.'));
    return;
  }

  // Modify this line to start your bot with the correct command and arguments
  bot = spawn('node', ['index.cjs'], {
    stdio: ['pipe', 'pipe', 'pipe', 'pipe', 'pipe', 'pipe', process.stderr]
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

  setTimeout(() => {
    updateStats(); // Update the box content with system and bot stats after stopping the bot
  }, 1000);
}

// Function to restart the Discord bot.
function restartBot() {
  stopBot();
  setTimeout(() => {
    startBot();
    writeToConsole(chalk.red('Bot restarted.'));
  }, 1000); // Delay restart to allow previous process to exit
  lastButtonUsed = 'R';
}

// Function to refresh the console.
function refreshConsole() {
  lastButtonUsed = 'L';
  consoleBox.setContent('{underline}Console{/underline}');
  writeToConsole('Console refreshed.');
  screen.render();
}

// Interstellar ASCII title
let title = '';
figlet.text('Interstellar', {
  font: 'Standard',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 80,
  whitespaceBreak: true
}, function(err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  title = chalk.magenta(data); // Purple
});

// Function to update the box content with system and bot stats
function updateStats() {
  // System stats
  const serverUptime = moment.duration(os.uptime() * 1000).humanize();
  const totalMemory = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + ' GB';
  const cpuCores = os.cpus().length.toString();
  const osInfo = `${os.type()} (${os.release()})`;

  const botUptime = botStartTime ? moment.duration(moment().diff(botStartTime)).humanize() : 'Not available';
  const botMemoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024 / 1024).toFixed(2) + ' GB';

  box.setContent(`${title}\n\n` +
    `${chalk.magenta('🌟 Interstellar status:')} ${botStatus === 'Online' ? chalk.green(botStatus) : chalk.red(botStatus)}\n\n` +
    `${chalk.magenta('Bot Prefix:')} ${chalk.green('$')}\n` +
    `${chalk.magenta('Bot Username:')} ${chalk.green(botUsername)}\n\n` +
    `${chalk.magenta('Server Uptime:')} ${chalk.green(serverUptime)}\n` +
    `${chalk.magenta('Total Memory:')} ${chalk.green(totalMemory)}\n` +
    `${chalk.magenta('Bot Uptime:')} ${chalk.green(botUptime)}\n` +
    `${chalk.magenta('Bot Memory Usage:')} ${chalk.green(botMemoryUsage)}\n` +
    `${chalk.magenta('CPU Cores:')} ${chalk.green(cpuCores)}\n` +
    `${chalk.magenta('OS Info:')} ${chalk.green(osInfo)}\n\n` +
    `${chalk.magenta('Commands:')}\n` +
    `${chalk.green('S')} - ${chalk.magenta('Start Bot')}\n` +
    `${chalk.green('X')} - ${chalk.magenta('Stop Bot')}\n` +
    `${chalk.green('R')} - ${chalk.magenta('Restart Bot')}\n` +
    `${chalk.green('L')} - ${chalk.magenta('Refresh Console')}\n` +
    `${chalk.magenta('Last Button Used:')} ${chalk.green(lastButtonUsed || 'None')}\n\n` +
    `${chalk.magenta('Press')} ${chalk.green('Ctrl+C')} ${chalk.magenta('to stop the bot and exit.')}`
  );
  screen.render();
}

// Function to write messages to the console box.
function writeToConsole(message) {
  const content = consoleBox.getContent();
  const newContent = `${content}\n${chalk.green(message)}`;
  consoleBox.setContent(newContent);
  screen.render();
}

// Update the stats immediately and then every minute
updateStats();
setInterval(updateStats, 60000);

// Terminate the bot process on Ctrl+C
process.on('SIGINT', () => {
  stopBot();
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});

// Listen for keystrokes and map them to commands.
screen.key(['S', 's'], () => {
  startBot();
});

screen.key(['X', 'x'], () => {
  stopBot();
});

screen.key(['R', 'r'], () => {
  restartBot();
});

screen.key(['L', 'l'], () => {
  refreshConsole();
});

// Render the screen.
screen.render();
