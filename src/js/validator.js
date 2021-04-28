import * as yup from 'yup';

const errorMessage = 'Ссылка должна быть валидным URL';

const schema = yup.string().url(errorMessage);
const validateUrl = (url) => schema.validate(url);

export default validateUrl;
