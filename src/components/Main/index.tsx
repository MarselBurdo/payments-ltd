import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Admin, Resource } from 'react-admin';

import { i18nProvider } from '@/118n';
import { ClientsCreate } from '@/components/Clients/ClientsCreate';
import { ClientsList } from '@/components/Clients/ClientsList';
import { ClientsShow } from '@/components/Clients/ClientsShow';
import { PaymentsCreate } from '@/components/Payments/PaymentsCreate';
import { PaymentsList } from '@/components/Payments/PaymentsList';
import { PaymentsView } from '@/components/Payments/PaymentsView';
import { authProvider } from '@/utils/authProvider';
import fakeDataProvider from '@/utils/fakeDataProvider';
import {dataProvider} from "@/utils/fakerest";
import Layout from "@/components/Layout/Layout";
import deals from "@/components/Deals";

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
          //     list={PaymentsList}
          //     create={PaymentsCreate}
          //     show={PaymentsView}
          //     icon={PaymentsIcon}
          // />
          <Resource name="deals" {...deals} />
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
