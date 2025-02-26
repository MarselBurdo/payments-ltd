import { Admin, Resource } from 'react-admin';


import companies from '@/components/Companies';
import contacts from '@/components/Contacts';
import Layout from '@/components/Layout/Layout';
import payments from '@/components/Payments';
import { authProvider } from '@/utils/authProvider';
import { dataProvider } from '@/utils/fakerest';

import '../../styles/globals.css'

const MainApp = () => {
  return (
      <Admin
          dataProvider={dataProvider}
          // i18nProvider={i18nProvider}
          authProvider={authProvider}
          getPermissions={authProvider.getPermissions}
          layout={Layout}
      >
        {permissions => [
          (permissions === 'processor' || permissions === 'client') && (
              <Resource name="payments" {...payments} />
          ),
          permissions === 'processor' && (<>
                <Resource name="companies" {...companies} />
                <Resource name="contacts" {...contacts} />
              </>
          ),
        ]}
      </Admin>
  )
};

export default MainApp;
