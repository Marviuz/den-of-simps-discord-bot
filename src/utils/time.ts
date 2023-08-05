import moment from 'moment';
import { env } from '@/env';
import 'moment-timezone';

export const now = () =>
  moment()
    .tz(env.APP_TZ as string)
    .format('MMM. DD YYYY | hh:mm A');

export const today = () => moment().tz(env.APP_TZ as string);
