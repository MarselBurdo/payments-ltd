import {
    Company,
    Contact,
    ContactNote,
    Payment,
    DealNote,
    Sale,
    Tag,
    Task,
} from '../../../types';

export interface Db {
    companies: Required<Company>[];
    contacts: Required<Contact>[];
    contactNotes: ContactNote[];
    payments: Deal[];
    dealNotes: DealNote[];
    sales: Sale[];
    tags: Tag[];
    tasks: Task[];
}
