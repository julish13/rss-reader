import * as yup from 'yup';

const errorMessages = {
  invalidUrl: 'Ссылка должна быть валидным URL',
  duplicate: 'RSS уже существует',
};

const schema = yup.string().url(errorMessages.invalidUrl);
const validateUrl = (url, list) => {
  const promise = schema.validate(url).then((urlValidating) => {
    const isDuplicate = list.some(
      ({ url: urlAdded }) => urlValidating === urlAdded,
    );
    if (isDuplicate) {
      throw new Error(errorMessages.duplicate);
    }
    return urlValidating;
  });
  return promise;
};

export default validateUrl;
