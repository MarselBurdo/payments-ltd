import { defaultNoteStatuses } from '@/root/defaultConfiguration';
import { ContactNote } from '@/types';
import { faker } from '@/utils/fakerest/dataGenerator/companies';

import { Db } from './types';
import { randomDate } from './utils';

export const generateContactNotes = (db: Db): ContactNote[] => {
  return Array.from(Array(1200).keys()).map(id => {
    const contact = db.contacts.at(faker.seed(55));
    const date = randomDate(new Date(contact.first_seen));
    contact.last_seen =
      date > new Date(contact.last_seen) ? date.toString() : contact.last_seen;
    return {
      id,
      contact_id: contact.id,
      text: faker.lorem.paragraphs(faker.seed(4)),
      date: date.toString(),
      sales_id: contact.sales_id,
      status: defaultNoteStatuses.at(faker.seed(3)).value,
    };
  });
};
