import React from 'react';
import { IntlProvider } from 'react-intl';

interface Props {
  children: any;
}

interface LanguageContextData {
  lang: string,
  setLang: (newValue: string) => void,
}

const defaultLanguageContextData: LanguageContextData = {
  lang: "en",
  setLang: (newLang: string) => { console.warn(`Failed to change language to "${newLang}": No context was provided (and the app fell back to the default data)`) },
};

export const LanguageContext = React.createContext(defaultLanguageContextData);

const germanData = {
  name: "Name",
  email: "E-Mail",
  message: "Nachricht",
  send_button: "Nachricht versenden",
};
const englishData = {
  name: "Name",
  email: "Email",
  message: "Message",
  send_button: "Send message",
};

const getLangData = (lang: string) => {
  switch (lang) {
    case "de":
      return germanData;
    case "en":
      return englishData;
    default:
      console.warn(`No translations available for language: "${lang}"`);
      return englishData;
  }
}

export default function Localizer(props: Props) {
  const [lang, setLang] = React.useState(defaultLanguageContextData.lang);
  const contextData: LanguageContextData = { lang, setLang };
  return <LanguageContext.Provider value={contextData}>
    <IntlProvider messages={getLangData(lang)} locale={lang} defaultLocale={defaultLanguageContextData.lang}>
      {props.children}
    </IntlProvider>
  </LanguageContext.Provider>
}