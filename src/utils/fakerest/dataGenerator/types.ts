import {
  Company,
  Contact,
  ContactNote,
  PaymentNote,
  Payment,
  Tag,
  Task,
  User,
} from '@/types';

export interface Db {
  companies: Required<Company>[];
  contacts: Required<Contact>[];
  contactNotes: ContactNote[];
  payments: Payment[];
  paymentNotes: PaymentNote[];
  sales: User[];
  tags: Tag[];
  tasks: Task[];
  users: User[];
}
