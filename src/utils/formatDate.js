export const formatDateAndHour = (date) => {
  const options = { hour: 'numeric', minute: 'numeric', timeZone: 'America/Sao_Paulo' };
  const format = date.toLocaleDateString('pt-BR', options).split(' ');
  const formatedDate = `${format[0]} - ${format[1]}`;

  return formatedDate;
};
