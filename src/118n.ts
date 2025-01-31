import polyglotI18nProvider from 'ra-i18n-polyglot';
import ru from 'ra-language-russian';
import en from 'ra-language-english';
import {resolveBrowserLocale} from "ra-core";

const translations ={
    en: {
        ...en,
        resources: {
            payments: {
                name: "Payments",
                fields: {
                    name: "Name",
                    amount: "Amount",
                    status: "Status",
                    description: "Description",
                },
            },
            clients: {
                name: "Clients",
                fields: {
                    name: "Name",
                    amount: "Amount",
                },
            },
        },
    },
    ru: {
        ...ru,
        resources: {
            payments: {
                name: "Платежи",
                fields: {
                    name: "Имя",
                    amount: "Сумма",
                    status: "Статус",
                    description: "Описание",
                },
            },
            clients: {
                name: "Клиенты",
                fields: {
                    id:'Идентификатор',
                    name: "Имя",
                    amount: "Сумма",
                    status: "Статус",
                    description: "Описание",
                },
            },
        },
    },
};

export const i18nProvider = polyglotI18nProvider(
    locale => translations[locale] ? translations[locale] : translations.en,
    resolveBrowserLocale('en', { fullLocale: true }),
    [{ locale: 'en', name: 'English' }, { locale: 'ru', name: 'Russian' }],
);