import {AuthProvider} from 'react-admin';

import {Sale} from '@/types';
import {canAccess} from '../commons/canAccess';
import {dataProvider} from './dataProvider';

export const DEFAULT_USER = {
    id: 2,
    user_id: 2,
    email: 'processor@example.com',
    role: 'processor',
    password: 'demo',

} as const;

export const DEFAULT_ROLE = 'processor'

export const USER_STORAGE_KEY = 'user';
export const ROLE_STORAGE_KEY = 'role';

localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({...DEFAULT_USER}));
localStorage.setItem(ROLE_STORAGE_KEY, DEFAULT_ROLE);

async function getUser(email: string) {
    const sales = await dataProvider.getList('sales', {
        pagination: {page: 1, perPage: 200},
        sort: {field: 'name', order: 'ASC'},
    });

    if (!sales.data.length) {
        return {...DEFAULT_USER};
    }

    const user = sales.data.find(sale => sale.email === email);
    if (!user || user.disabled) {
        return {...DEFAULT_USER};
    }
    return user;
}

export const authProvider: AuthProvider = {
    login: async ({email}) => {
        const user = await getUser(email);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem(USER_STORAGE_KEY);
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem(USER_STORAGE_KEY)
            ? Promise.resolve()
            : Promise.reject(),
    canAccess: async ({signal, ...params}) => {
        // Get the current user
        const userItem = localStorage.getItem(USER_STORAGE_KEY);
        const localUser = userItem ? (JSON.parse(userItem) as Sale) : null;
        if (!localUser) return false;

        // Compute access rights from the sale role
        const role = localUser.administrator ? 'admin' : 'user';
        return canAccess(role, params);
    },
    getIdentity: () => {
        const userItem = localStorage.getItem(USER_STORAGE_KEY);
        const user = userItem ? (JSON.parse(userItem) as Sale) : null;
        return Promise.resolve({
            id: user?.id ?? 0,
            fullName: user ? `${user.first_name} ${user.last_name}` : 'Jane Doe',
            avatar: user?.avatar?.src,
        });
    },
};
