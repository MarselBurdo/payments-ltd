/* eslint-disable import/no-anonymous-default-export */
import { CompanyCreate } from './CompanyCreate';
import { CompanyEdit } from './CompanyEdit';
import { CompanyList } from './CompanyList';
import { CompanyShow } from './CompanyShow';

export default {
  list: CompanyList,
  create: CompanyCreate,
  edit: CompanyEdit,
  show: CompanyShow,
};
