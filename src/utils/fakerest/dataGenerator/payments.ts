import { add } from 'date-fns';

import {
    defaultDealCategories,
    defaultDealStages,
} from '@/root/defaultConfiguration';
import { Deal } from '@/types';
import { Db } from './types';
import { randomDate } from './utils';
import {faker} from "@/utils/fakerest/dataGenerator/companies";

export const generatePayments = (db: Db): Deal[] => {
    const deals = Array.from(Array(50).keys()).map(id => {
        const company = db.companies.at(faker.seed(54));
        company.nb_deals++;
        const contacts =
            db.contacts.filter(contact => contact.company_id === company.id)
        const lowercaseName = faker.lorem.words();
        const created_at = randomDate(
            new Date(company.created_at)
        ).toISOString();

        const expected_closing_date = randomDate(
            new Date(created_at),
            add(new Date(created_at), { months: 6 })
        ).toISOString();

        return {
            id,
            name: lowercaseName[0].toUpperCase() + lowercaseName.slice(1),
            company_id: company.id,
            contact_ids: contacts.map(contact => contact.id),
            category: defaultDealCategories.at(faker.seed(5)),
            stage: defaultDealStages[Math.floor(Math.random() * defaultDealStages.length)].value,
            description: faker.lorem.paragraphs(faker.seed(4)),
            amount: faker.seed(1000) * 100000,
            created_at,
            updated_at: randomDate(new Date(created_at)).toString(),
            expected_closing_date,
            index: 0,
        };
    });
    // compute index based on stage
    defaultDealStages.forEach(stage => {
        deals
            .filter(deal => deal.stage === stage.value)
            .forEach((deal, index) => {
                deals[deal.id].index = index;
            });
    });
    return deals;
};
