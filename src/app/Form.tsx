import { createRef, useState } from "react";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { FormattedMessage, useIntl } from 'react-intl';
import { submitForm } from "./Submit";
import { validate } from "./Validator";

export interface MyFormData {
    name: string,
    email: string,
    message: string,
}

interface EnterKeyHandlerProps {
    next_focus_ref: any,
    children: any,
}

const DEFAULT_FORM_DATA: MyFormData = {
    name: "",
    email: "",
    message: "",
}

interface Props {
}

const trimFormData = (data: MyFormData): MyFormData => {
    return {
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
    }
}

const validateAndSubmit = (data: MyFormData) => {
    data = trimFormData(data);
    validate(data).then((valid) => valid && submitForm(data));
}

const focus = (ref: React.RefObject<unknown>) => {
    ref.current && (ref.current as any).focus();
}

const EnterKeyHandler = (props: EnterKeyHandlerProps) => {
    let focusNext = () => {
        const focusNextElement = () => focus(props.next_focus_ref);
        // The timeout prevents the textarea from creating a new line (caused by the same event)
        setTimeout(focusNextElement, 10);
    };
    return <KeyboardEventHandler
        handleKeys={["enter"]}
        onKeyEvent={focusNext}>
        {props.children}
    </KeyboardEventHandler>
}

const Form = (props: Props) => {
    const intl = useIntl();
    const [data, setData] = useState(DEFAULT_FORM_DATA);
    const email_ref: React.RefObject<HTMLInputElement> = createRef();
    const message_ref: React.RefObject<HTMLTextAreaElement> = createRef();
    const onChange = (fieldName: string) => {
        return (e: any) => {
            const copy = { ...data };
            if (Object.keys(copy).includes(fieldName)) {
                (copy as any)[fieldName] = e.target.value;
                setData(copy);
            } else {
                console.warn(`Object has no field called "${fieldName}":`, copy);
            }
        }
    };
    return <div className="form">
        <h2><FormattedMessage id="name" /></h2>
        <EnterKeyHandler next_focus_ref={email_ref}>
            <input
                autoFocus
                type="text"
                placeholder={intl.formatMessage({ id: "name_placeholder" })}
                value={data.name}
                onChange={onChange("name")} />
        </EnterKeyHandler>
        <h2><FormattedMessage id="email" /></h2>
        <EnterKeyHandler next_focus_ref={message_ref}>
            <input
                ref={email_ref}
                type="email"
                placeholder={intl.formatMessage({ id: "email_placeholder" })}
                value={data.email}
                onChange={onChange("email")} />
        </EnterKeyHandler>
        <h2><FormattedMessage id="message" /></h2>
        <textarea
            ref={message_ref}
            placeholder={intl.formatMessage({ id: "message_placeholder" })}
            onChange={onChange("message")} />
        <button onClick={() => validateAndSubmit(data)}>
            <FormattedMessage id="send_button" />
        </button>
    </div>
}

export default Form;