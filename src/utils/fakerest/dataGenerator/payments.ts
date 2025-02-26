import { add } from 'date-fns';

import {
  defaultPaymentCategories,
  defaultPaymentStages,
} from '@/root/defaultConfiguration';
import { Payment } from '@/types';
import { faker } from '@/utils/fakerest/dataGenerator/companies';

import { Db } from './types';
import { randomDate } from './utils';

const generateName=()=>{
  return faker.lorem.words()
}

const paymentWithName= Array.from({length:70},()=>generateName())

export const generatePayments = (db: Db): Payment[] => {
  const payments = paymentWithName.map((name,id) => {
    const company = db.companies[Math.floor(Math.random()*db.companies.length)]
    company.nb_deals++;
    const contacts = db.contacts.filter(
      contact => contact.company_id === company.id
    );
    const created_at = randomDate(new Date(company.created_at)).toISOString();

    const expected_closing_date = randomDate(
      new Date(created_at),
      add(new Date(created_at), { months: 6 })
    ).toISOString();
    return {
      id,
      name: name[0].toUpperCase() + name.slice(1),
      company_id: company.id,
      contact_ids: contacts.map(contact => contact.id),
      category: defaultPaymentCategories[Math.floor(Math.random() * defaultPaymentCategories.length)],
      stage:
        defaultPaymentStages[
          Math.floor(Math.random() * defaultPaymentStages.length)
        ].value,
      description: faker.lorem.paragraphs(Math.floor(Math.random() * 4)),
      amount: Math.floor(Math.random() * 100000000),
      created_at,
      updated_at: randomDate(new Date(created_at), new Date(Date.now() + 864000000)),
      expected_closing_date,
      index: 0,
    };
  });
  // compute index based on stage
  defaultPaymentStages.forEach(stage => {
    payments
      .filter(deal => deal.stage === stage.value)
      .forEach((deal, index) => {
        payments[deal.id].index = index;
      });
  });
  return payments;
};
