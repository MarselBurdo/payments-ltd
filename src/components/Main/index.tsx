import fakeDataProvider from "@/utils/fakeDataProvider";
import {Admin, Resource, ListGuesser, EditGuesser} from "react-admin";
import {PaymentsList} from "@/components/Payments/PaymentsList";
import {PaymentsView} from "@/components/Payments/PaymentsView";
import {PaymentsCreate} from "@/components/Payments/PaymentsCreate";
import {i18nProvider} from "@/118n";
import {authProvider} from "@/utils/authProvider";



const MainApp = () => (
        <Admin dataProvider={fakeDataProvider} i18nProvider={i18nProvider} authProvider={authProvider}>
            <Resource
                name="payments"
                list={PaymentsList}
                recordRepresentation="id"
                show={PaymentsView}
                create={PaymentsCreate}
            />
            <Resource
                name="clients"
                list={ListGuesser}
                edit={EditGuesser}
                recordRepresentation="title"
            />

        </Admin>
);

export default MainApp;