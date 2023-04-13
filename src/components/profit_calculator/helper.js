import { nanoid } from 'nanoid';

export const calc_total = (ingredientes, supplies) => {
  let total = 0;
  ingredientes.forEach(({ supplieId, cantidad }) =>
    supplies.forEach(({ id, total_por_gramo }) =>
      id === supplieId ? (total += total_por_gramo * cantidad) : null
    )
  );
  console.log({ ingredientes, supplies, total });

  return total;
};

export const getDecimal = (num, length) => {
  const div = num.toString();
  const index = div.indexOf('.');
  if (index === '-1') return num;
  const start = div.slice(0, index);
  const end = div.slice(index, index + length);
  const result = start + end;
  return result;
};

export const _add = (previusValue, obj, action) => {
  const { id } = obj;
  const actions = {
    create: [...previusValue, { ...obj, id: nanoid() }],
    edit: previusValue.map((val) => (val.id === id ? { ...val, ...obj } : val)),
    delete: previusValue.filter((value) => value.id !== id),
  };
  const result = actions[action];
  return result;
};
export const today = () => {
  const date = new Date();
  let dia = date.getDate();
  let mes = date.getMonth() + 1;
  let year = date.getFullYear();
  if (dia < 10) dia = '0' + dia;
  if (mes < 10) mes = '0' + mes;
  const hoy = `${year}-${mes}-${dia}`;
  return hoy;
};
