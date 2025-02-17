import { User } from '@/types';

import { Db } from './types';

const users: User[] = [
  {
    id: 1,
    user_id:1,
    email: 'test@example.com',
    role: 'client',
    password: 'demo',
  },
  {
    id: 2,
    user_id:2,
    email: 'processor@example.com',
    role: 'processor',
    password: 'demo',
  },
];

export const generateUsers = (db: Db) => {
  return users.map(el => ({
    ...el,
  }));
};
