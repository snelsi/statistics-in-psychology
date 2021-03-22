export const getRandomNumber = (min = 0, max = 100) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const getRandomBool = (successRate = 0.5) => Math.random() > successRate;

export const isNumber = (value: any) => typeof value === "number" && isFinite(value);

export const isNumberString = (str: string) => /^-?\d+([\.\,]\d+)?$/.test(str) || /^[\.\,]\d+$/.test(str);

export const roundTo = (value: number, precision = 2) => {
  const divider = 10 ** precision;
  return Math.round(value * divider) / divider;
};
