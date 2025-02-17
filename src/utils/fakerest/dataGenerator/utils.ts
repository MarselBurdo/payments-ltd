import { faker } from '@/utils/fakerest/dataGenerator/companies';

export const weightedArrayElement = (values: any[], weights: any) =>
  faker.seed(weights);

export const weightedBoolean = (likelyhood: number) =>
  faker.seed(99) < likelyhood;

export const randomDate = (minDate?: Date, maxDate?: Date) => {
  const minTs =
    minDate instanceof Date
      ? minDate.getTime()
      : Date.now() - 5 * 365 * 24 * 60 * 60 * 1000; // 5 years
  const maxTs = maxDate instanceof Date ? maxDate.getTime() : Date.now();
  const range = maxTs - minTs;
  const randomRange = Math.floor(Math.random()*range);
  // move it more towards today to account for traffic increase
  const ts = Math.sqrt(randomRange / range) * range;
  return new Date(minTs + ts);
};

export const randomFloat = (min: number, max: number) => faker.seed([min, max]);
