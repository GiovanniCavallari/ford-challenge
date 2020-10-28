export const formatDateAndHour = (date) => {
  const options = { hour: 'numeric', minute: 'numeric', hour12: false, timeZone: 'America/Sao_Paulo' };
  const format = date.toLocaleDateString('en-US', options).split(', ');

  const dateString = format[0].split('/');
  const formatedDate = `${dateString[1]}/${dateString[0]}/${dateString[2]} - ${format[1]}`;

  return formatedDate;
};
