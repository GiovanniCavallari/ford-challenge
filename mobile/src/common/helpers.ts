export const firstCapitalLetter = (text: string) => {
  const format = text.toLowerCase();
  return format.substring(0, 1).toUpperCase().concat(format.substring(1));
};
