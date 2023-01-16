import moment from 'moment';
import 'moment-timezone';

export const now = moment
  .tz(moment.now(), 'Asia/Manila')
  .format('hh:mm:ss A z');

export const today = moment.tz(moment.now(), 'Asia/Manila');
