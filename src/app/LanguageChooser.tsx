import { LanguageContext } from "./i18n/ContextLocalizer";

interface Props {
    lang: string,
    setLang: (new_value: string) => void,
}

export const LanguageChooser = (props: Props) => {
    const onChange = (e: any) => props.setLang(e.target.value);
    return <div className="lang-select">
        <select onChange={onChange} value={props.lang}>
            <option value="en">🇺🇸 English</option>
            <option value="de">🇩🇪 Deutsch</option>
        </select>
    </div>
}

export const LanguageChooserContextAdapter = () => {
    return <LanguageContext.Consumer>
        {data => {
            return <LanguageChooser
                lang={data.lang}
                setLang={data.setLang} />
        }
        }
    </LanguageContext.Consumer>
}