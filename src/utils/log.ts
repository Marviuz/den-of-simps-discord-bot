import chalk from 'chalk';
import { now } from './time';

const log = (...str: any | any[]) => console.log(`> ${now()} |`, ...str);
log.error = (...str: any | any[]) =>
  console.error(chalk.red(`> ${now()} |`, ...str));
log.warn = (...str: any | any[]) =>
  console.warn(chalk.yellow(`> ${now()} |`, ...str));
log.success = (...str: any | any[]) =>
  console.log(chalk.green(`> ${now()} |`, ...str));
log.info = (...str: any | any[]) =>
  console.info(chalk.blue(`> ${now()} |`, ...str));

export default log;
