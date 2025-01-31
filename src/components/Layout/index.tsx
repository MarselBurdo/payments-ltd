import { Layout, Button } from "react-admin";
import { AppBar, TitlePortal } from "react-admin";
import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import {useSetLocale, useRefresh} from "ra-core";



const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const refresh = useRefresh()

    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "ru" : "en";
        i18n.changeLanguage(newLang).then(() => {
            localStorage.setItem("i18nextLng", newLang); // Сохраняем выбор пользователя
            refresh()
        });
    };

    return (
        <Button color="inherit" onClick={toggleLanguage} key={i18n.language}>
            {i18n.language === "en" ? "RU" : "EN"}
        </Button>
    );
};

const MyAppBar = () => (
    <AppBar>
        <TitlePortal />
        <Box flex="1">
            <Typography variant="h6">My Admin</Typography>
        </Box>
        <LanguageSwitcher />
    </AppBar>
);


const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

export default MyLayout;