import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: true,
        lng: localStorage.getItem("i18nextLng") || "en",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    ra: {
                        action: {
                            create: 'Create'
                        }
                    },
                    resources: {
                        payments: {
                            name: "Payments",
                            fields: {
                                name: "Name",
                                amount: "Amount",
                                status: "Status", // Добавлено
                                description: "Description", // Добавлено
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
            },
            ru: {
                translation: {
                    ra: {
                        action: {
                            // create: 'Создать'
                        }
                    },
                    resources: {
                        payments: {
                            name: "Платежи",
                            fields: {
                                name: 'Имя',
                                amount: "Сумма",
                                status: "Статус", // Добавлено
                                description: "Описание", // Добавлено
                            },
                        },
                        clients: {
                            name: "Клиенты"
                        }
                    },
                },
            },
        },
        detection: {
            order: ["localStorage", "cookie", "navigator"], // Источники определения языка
            caches: ["localStorage", "cookie"], // Кеширование выбора
        },
    });


export default i18n;
