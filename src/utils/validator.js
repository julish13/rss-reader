import * as yup from 'yup';

const validateUrl = (urlValidated, list) => {
  const schema = yup
    .string()
    .required('empty')
    .url('invalidUrl')
    .notOneOf(
      list.map(({ url }) => url),
      'duplicate',
    );
  return schema.validate(urlValidated.trim());
};

export default validateUrl;
