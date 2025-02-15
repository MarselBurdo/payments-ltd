import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Admin, Resource } from 'react-admin';

import { i18nProvider } from '@/118n';
import { ClientsCreate } from '@/components/Clients/ClientsCreate';
import { ClientsList } from '@/components/Clients/ClientsList';
import { ClientsShow } from '@/components/Clients/ClientsShow';

import { authProvider } from '@/utils/authProvider';

import {dataProvider} from "@/utils/fakerest";
import Layout from "@/components/Layout/Layout";
import payments from "@/components/Payments";
import companies from "@/components/Companies";
import contacts from "@/components/Contacts";

const MainApp = () => (
  <Admin
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    authProvider={authProvider}
    getPermissions={authProvider.getPermissions}
    layout={Layout}
  >
    {(permissions) => [
      (permissions === 'processor' || permissions === 'client') && (
          <Resource name="payments" {...payments} />
      ),
      permissions === 'processor' && (
          <Resource name="companies" {...companies} />
      ),
    ]}
          <Resource name="contacts" {...contacts} />
  </Admin>
);

export default MainApp;
