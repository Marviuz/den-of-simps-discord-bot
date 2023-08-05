/* eslint-disable no-console */
import { now } from '../time';
import * as theme from './theme';

const log = (...message: unknown[]) =>
  console.log(`[${now()}]`, '[\u276f\u276f\u276f]:', ...message);

log.info = (...message: unknown[]) =>
  console.log(theme.info(`[${now()}]`, '[INF]:'), ...message);

log.success = (...message: unknown[]) =>
  console.log(theme.success(`[${now()}]`, '[SCS]:'), ...message);

log.warn = (...message: unknown[]) =>
  console.log(theme.warning(`[${now()}]`, '[WRN]:'), ...message);

log.error = (...message: unknown[]) =>
  console.log(theme.error(`[${now()}]`, '[ERR]:'), ...message);

export default log;
