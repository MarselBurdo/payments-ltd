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

const MainApp = () => (
  <Admin
    dataProvider={fakeDataProvider}
    i18nProvider={i18nProvider}
    authProvider={authProvider}
  >
    <Resource
      name="payments"
      recordRepresentation="id"
      list={PaymentsList}
      create={PaymentsCreate}
      show={PaymentsView}
      icon={PaymentsIcon}
    />
    <Resource
      name="clients"
      recordRepresentation="title"
      list={ClientsList}
      create={ClientsCreate}
      show={ClientsShow}
      icon={AssuredWorkloadIcon}
    />
  </Admin>
);

export default MainApp;
