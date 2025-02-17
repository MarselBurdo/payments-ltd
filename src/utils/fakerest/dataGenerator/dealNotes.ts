import { faker } from '@/utils/fakerest/dataGenerator/companies';

import { Db } from './types';
import { randomDate } from './utils';

export const generateDealNotes = (db: Db) => {
  return Array.from(Array(300).keys()).map(id => {
    const payment = db.payments[Math.floor(Math.random()*db.payments.length)];
    return {
      id,
      deal_id: payment.id,
      text: faker.lorem.paragraphs(faker.seed(4)),
      date: randomDate(
        new Date(db.payments[payment.id as number].created_at)
      ).toISOString(),
    };
  });
};
