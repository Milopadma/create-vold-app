export const useNumberPad = (number: number) => {
  return number.toString().padStart(2, '0');
};
