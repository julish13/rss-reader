import * as yup from 'yup';

const schema = yup.string().url('invalidUrl');
const validateUrl = (url, list) => {
  const promise = schema.validate(url).then((urlValidating) => {
    const isDuplicate = list.some(
      ({ url: urlAdded }) => urlValidating === urlAdded,
    );
    if (isDuplicate) {
      throw new Error('duplicate');
    }
    return urlValidating;
  });
  return promise;
};

export default validateUrl;
