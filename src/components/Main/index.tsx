import fakeDataProvider from "@/utils/fakeDataProvider";
import {Admin, Resource, EditGuesser} from "react-admin";
import {PaymentsList} from "@/components/Payments/PaymentsList";
import {PaymentsView} from "@/components/Payments/PaymentsView";
import {PaymentsCreate} from "@/components/Payments/PaymentsCreate";
import {i18nProvider} from "@/118n";
import {authProvider} from "@/utils/authProvider";

import PaymentsIcon from '@mui/icons-material/Payments';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import {ClientList} from "@/components/Clients/ClientList";



const MainApp = () => (
    <Admin dataProvider={fakeDataProvider} i18nProvider={i18nProvider} authProvider={authProvider}>
        <Resource
            name="payments"
            list={PaymentsList}
            recordRepresentation="id"
            show={PaymentsView}
            create={PaymentsCreate}
            icon={PaymentsIcon}
        />
        <Resource
            name="clients"
            list={ClientList}
            edit={EditGuesser}
            recordRepresentation="title"
            icon={AssuredWorkloadIcon}
        />

    </Admin>
);

export default MainApp;