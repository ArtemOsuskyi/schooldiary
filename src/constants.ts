import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const nowDate = dayjs().utc().toDate();
export const nowDateIso = dayjs().utc().format('YYYY-MM-DD');
