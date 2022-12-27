const chalk = require('chalk');

const log = (...str) => console.log(...str);
log.error = (...str) => console.error(chalk.red(...str));
log.warn = (...str) => console.warn(chalk.yellow(...str));
log.success = (...str) => console.log(chalk.green(...str));
log.info = (...str) => console.info(chalk.blue(...str));

module.exports = log;
