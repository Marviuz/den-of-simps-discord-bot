const chalk = require('chalk');
const { now } = require('./time');

const log = (...str) => console.log(`> ${now} |`, ...str);
log.error = (...str) => console.error(chalk.red(`> ${now} |`, ...str));
log.warn = (...str) => console.warn(chalk.yellow(`> ${now} |`, ...str));
log.success = (...str) => console.log(chalk.green(`> ${now} |`, ...str));
log.info = (...str) => console.info(chalk.blue(`> ${now} |`, ...str));

module.exports = log;
