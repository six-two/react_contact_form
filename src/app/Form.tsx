import { useState } from "react";
import { submitForm } from "./Submit";
import { validate } from "./Validator";

const TEXT_AREA_PLACEHOLDER = "You can write this message in English or German. If you need to send me a file, upload it somewhere (Dropbox, Mega, etc) and just put the link here.";

export interface MyFormData {
    name: string,
    email: string,
    message: string,
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

const Form = (props: Props) => {
    const [data, setData] = useState(DEFAULT_FORM_DATA);
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
        <h2>Name</h2>
        <input id="name" type="text" placeholder="Optional" onChange={onChange("name")} />
        <h2>Email</h2>
        <input id="email" type="text" placeholder="Where to send my response" onChange={onChange("email")} />
        <h2>Message</h2>
        <textarea placeholder={TEXT_AREA_PLACEHOLDER} onChange={onChange("message")} />
        <button onClick={() => validateAndSubmit(data)}>Send message</button>
    </div>
}

export default Form;