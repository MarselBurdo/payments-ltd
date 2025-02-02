import { fakeData } from '@/constants/fakeData';

export const authProvider = {
  login: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const user = fakeData.users.find(
      u => u.email === username && u.password === password
    );

    if (!user) {
      return Promise.reject(new Error('Invalid credentials'));
    }

    localStorage.setItem('user', JSON.stringify(user));
    return Promise.resolve(user);
  },

  logout: async () => {
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    return Promise.resolve();
  },
  checkAuth: async () => {
    // const role = localStorage.getItem('role');
    // return role ? Promise.resolve() : Promise.reject();
    const user = localStorage.getItem('user');
    return user ? Promise.resolve() : Promise.reject();
  },
  getIdentity: async () => {
    const role = localStorage.getItem('role');
    return role
      ? Promise.resolve({ id: role, fullName: role })
      : Promise.reject();
  },
  checkError: async () => Promise.resolve(),
  getPermissions: async () => {
    const role = localStorage.getItem('role');
    return role ? Promise.resolve(role) : Promise.reject();
  },
};
