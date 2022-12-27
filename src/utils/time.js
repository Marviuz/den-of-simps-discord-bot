const moment = require('moment');
require('moment-timezone');

exports.now = moment.tz(moment.now(), 'Asia/Manila').format('hh:mm:ss A z');
