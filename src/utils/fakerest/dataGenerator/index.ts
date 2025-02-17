/* eslint-disable import/no-anonymous-default-export */
import { generateUsers } from '@/utils/fakerest/dataGenerator/users';

import { generateCompanies } from './companies';
import { generateContactNotes } from './contactNotes';
import { generateContacts } from './contacts';
import { generateDealNotes } from './dealNotes';
import { finalize } from './finalize';
import { generatePayments } from './payments';
import { generateSales } from './sales';
import { generateTags } from './tags';
import { generateTasks } from './tasks';
import { Db } from './types';

export default (): Db => {
  const db = {} as Db;
  db.sales = generateUsers(db);
  db.tags = generateTags(db);
  db.companies = generateCompanies(db);
  db.contacts = generateContacts(db);
  db.contactNotes = generateContactNotes(db);
  db.payments = generatePayments(db);
  db.paymentNotes = generateDealNotes(db);
  db.tasks = generateTasks(db);
  db.users = generateUsers(db);
  finalize(db);

  return db;
};
