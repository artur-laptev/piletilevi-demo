import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween);

export const FORMAT = {
  LOCAL_DATE: 'DD.MM.YYYY',
};

export const getDate = (...args) => dayjs(...args);

export const getLocalDate = (value) => dayjs(value).format(FORMAT.LOCAL_DATE);