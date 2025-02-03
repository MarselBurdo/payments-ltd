import { DataProvider } from 'react-admin';

import { fakeData } from '@/constants/fakeData';

const fakeDataProvider: DataProvider = {
  getList: (resource, params) => {
    const { page=1, perPage=10 } = params.pagination || {};
    const { field, order } = params.sort || { field: 'id', order: 'ASC' };
    const { q } = params.filter || {};

    let data = [...fakeData[resource]];
    // Фильтрация по поисковому запросу
    if (q) {
      const lowerCaseQuery = q.toLowerCase();
      data = data.filter(item =>
        Object.values(item).some(
          value =>
            typeof value === 'string' &&
            value.toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
    // Сортировка данных
    data.sort((a, b) => {
      if (a[field] < b[field]) return order === 'ASC' ? -1 : 1;
      if (a[field] > b[field]) return order === 'ASC' ? 1 : -1;
      return 0;
    });

    // Пагинация
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedData = data.slice(start, end);

    return Promise.resolve({
      data: paginatedData,
      total: data.length,
    });
  },
  getOne: (resource, params) => {
    const record = fakeData[resource].find(item => item.id === params.id);
    return Promise.resolve({ data: record });
  },
  create: (resource, params) => {
    const newRecord = { id: Date.now(), ...params.data, status: 'Pending' };
    fakeData[resource].push(newRecord);
    return Promise.resolve({ data: newRecord });
  },
  update: (resource, params) => {
    const index = fakeData[resource].findIndex(item => item.id === params.id);
    fakeData[resource][index] = {
      ...fakeData[resource][index],
      ...params.data,
    };
    return Promise.resolve({ data: fakeData[resource][index] });
  },
  delete: (resource, params) => {
    fakeData[resource] = fakeData[resource].filter(
      item => item.id !== params.id
    );
    return Promise.resolve({ data: params.previousData });
  },
};
export default fakeDataProvider;
