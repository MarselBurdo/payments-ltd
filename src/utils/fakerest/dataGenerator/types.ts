import {
  Company,
  Contact,
  ContactNote,
  DealNote,
  Payment,
  Sale,
  Tag,
  Task,
  User,
} from '@/types';

export interface Db {
  companies: Required<Company>[];
  contacts: Required<Contact>[];
  contactNotes: ContactNote[];
  payments: Payment[];
  dealNotes: DealNote[];
  sales: Sale[];
  tags: Tag[];
  tasks: Task[];
  users: User[];
}
