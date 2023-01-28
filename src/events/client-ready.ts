import { Client, Events } from 'discord.js';
import log from '../utils/log';
import schedule from 'node-schedule';
import { today } from '../utils/time';

export default {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    log.success(`${client.user?.tag} ready!`);

    const rule = new schedule.RecurrenceRule();

    rule.hour = 0;
    rule.minute = 0;
    rule.tz = 'Asia/Manila';

    schedule.scheduleJob(
      rule,
      ((date: number) => {
        const isOdd = date % 2;

        try {
          if (isOdd) {
            client.user?.setUsername('Ganyu');
            client.user?.setAvatar('https://i.imgur.com/Bnng7tq.png');
          } else {
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
  },
};
