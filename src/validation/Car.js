import * as Yup from 'yup';

const fields = {
  title: Yup.string()
    .min(3, 'Título precisa ter no mínimo 3 caracteres')
    .required('Título é necessário'),
  model: Yup.string().required('Modelo é necessário'),
  brand: Yup.string().required('Marca é necessária'),
  year: Yup.number()
    .typeError('O ano precisa ser um número inteiro')
    .integer()
    .required('Ano é necessário'),
  color: Yup.string().required('Cor é necessária'),
  km: Yup.number()
    .integer()
    .typeError('KM precisa ser um número inteiro')
    .required('KM é necessário'),
  price: Yup.number()
    .typeError('O preço precisa ser um número')
    .required('Preço é necessário'),
};

export const storeSchema = Yup.object().shape({
  ...fields,
  id: Yup.number()
    .integer()
    .typeError('O ID precisa ser um número inteiro')
    .required('ID é necessário'),
});

export const updateSchema = Yup.object().shape(fields);
