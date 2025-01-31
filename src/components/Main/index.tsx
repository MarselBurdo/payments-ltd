import fakeDataProvider from "@/utils/fakeDataProvider";
import {Admin, Resource, ListGuesser, EditGuesser} from "react-admin";
import {PaymentsList} from "@/components/Payments/PaymentsList";
import {PaymentsView} from "@/components/Payments/PaymentsView";
import {PaymentsCreate} from "@/components/Payments/PaymentsCreate";
import i18n from "@/118n";
import MyLayout from "@/components/Layout";
import {authProvider} from "@/utils/authProvider";
import polyglotI18nProvider from 'ra-i18n-polyglot';
import ru from 'ra-language-russian';

// const i18nProvider = {
//     translate: (key, options) => i18n.t(key, options),
//     changeLocale: (locale) => {
//         return new Promise((resolve) => {
//             i18n.changeLanguage(locale, () => resolve(locale));
//         });
//     },
//     getLocale: () => i18n.language,
// };

 const i18nProvider = polyglotI18nProvider(() => ru, 'ru');
const MainApp = () => (
        <Admin dataProvider={fakeDataProvider} i18nProvider={i18nProvider} auth>
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