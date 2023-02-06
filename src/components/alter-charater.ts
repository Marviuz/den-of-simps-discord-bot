import { Client } from 'discord.js';
import schedule from 'node-schedule';
import log from '../utils/log';
import { today } from '../utils/time';

export const createCharacterAlterer = (client: Client) => {
  log.info('Creating schedule for character alter...');

  const rule = new schedule.RecurrenceRule();

  rule.hour = 0;
  rule.minute = 0;
  rule.tz = 'Asia/Manila';

  schedule.scheduleJob(
    rule,
    ((date: number) => {
      const isOdd = date % 2;

      log.info('Date is odd or even?', isOdd);

      try {
        if (isOdd) {
          log.info('Deploying Ganyu');
          client.user?.setUsername('Ganyu');
          client.user?.setAvatar('https://i.imgur.com/Bnng7tq.png');
        } else {
          log.info('Deploying Elysia');
          client.user?.setUsername('Elysia');
          client.user?.setAvatar('https://i.imgur.com/60hMz4x.png');
        }
      } catch (err) {
        log.error(err);
      } finally {
        log.info("Name and avatar change should've finished");
      }
    }).bind(null, parseInt(today().format('D')))
  );

  log.success('Creation finished');
};
