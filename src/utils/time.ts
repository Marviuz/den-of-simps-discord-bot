import moment from 'moment';
import 'moment-timezone';

export const now = () =>
  moment()
    .tz(process.env.APP_TZ as string)
    .format('MMM. DD YYYY | hh:mm A');
