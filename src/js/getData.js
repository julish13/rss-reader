import axios from 'axios';
import proxifyUrl from './utils/proxifyUrl.js';

const getData = (link) => {
  const urlProxified = proxifyUrl(link);
  return axios.get(urlProxified).catch(() => {
    throw new Error('Ошибка сети');
  });
};

export default getData;
