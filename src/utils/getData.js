import axios from 'axios';
import proxifyUrl from './proxifyUrl.js';

const getData = (link) => {
  const urlProxified = proxifyUrl(link);
  return axios.get(urlProxified).catch(() => {
    throw new Error('network');
  });
};

export default getData;
