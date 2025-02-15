

import { Db } from './types';
import { randomDate } from './utils';
import {faker} from "@/utils/fakerest/dataGenerator/companies";

export const generateDealNotes = (db: Db) => {
    return Array.from(Array(300).keys()).map(id => {
        const deal = db.payments.at(faker.seed(10));
        return {
            id,
            deal_id: deal.id,
            text: faker.lorem.paragraphs(faker.seed(4)),
            date: randomDate(
                new Date(db.payments[deal.id as number].created_at)
            ).toISOString(),
        };
    });
};
