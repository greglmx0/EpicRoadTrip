import moment from 'moment';
import 'moment/locale/fr';

/**
 * Format date to 'ddd. DD MMMM YYYY'
 * Example: '2021-09-01T00:00:00Z' => 'mar. 01 Septembre 2021'
 * @param date string
 * @return string
 */
export const formatDate = (date: string) => {
  const day = moment(date).format('dddd').slice(0, 3);
  return day + '. ' + moment(date).format('DD MMMM YYYY');
};

/**
 * Format time to 'HH:mm'
 * Example: '2021-09-01T00:00:00Z' => '00:00'
 * @param date string
 * @return string
 */
export const formatTime = (date: string) => {
  return moment(date).format('HH:mm');
};

export const formatDateTime = (date: string) => {
  return moment(date).format('YYYY-MM-DD HH:mm');
};
