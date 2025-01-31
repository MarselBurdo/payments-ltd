export const authProvider = {
    login: async ({ username }) => {
        // Симуляция авторизации
        const roles = {
            client: 'client',
            processor: 'processor',
        };

        // Простая проверка роли на основе имени пользователя
        const role = roles[username.toLowerCase()];
        if (!role) {
            throw new Error('Неверные учетные данные');
        }

        // Сохраняем данные о пользователе (например, роль)
        localStorage.setItem('role', role);
        return Promise.resolve();
    },
    logout: async () => {
        localStorage.removeItem('role');
        return Promise.resolve();
    },
    checkAuth: async () => {
        const role = localStorage.getItem('role');
        return role ? Promise.resolve() : Promise.reject();
    },
    getIdentity: async () => {
        const role = localStorage.getItem('role');
        return role ? Promise.resolve({ id: role, fullName: role }) : Promise.reject();
    },
    checkError: async () => Promise.resolve(),
    getPermissions: async () => {
        const role = localStorage.getItem('role');
        return role ? Promise.resolve(role) : Promise.reject();
    },
};