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
          // <Resource
          //     key="deals"
          //     name="deals"
          //     recordRepresentation="id"
          //     list={PaymentsList1}
          //     create={PaymentsCreate1}
          //     show={PaymentsView1}
          //     icon={PaymentsIcon}
          // />
          <Resource name="payments" {...payments} />
      ),
      permissions === 'processor' && (
          <Resource
              key="companies"
              name="companies"
              recordRepresentation="title"
              list={ClientsList}
              create={ClientsCreate}
              show={ClientsShow}
              icon={AssuredWorkloadIcon}
          />
      ),
    ]}
  </Admin>
);

export default MainApp;
