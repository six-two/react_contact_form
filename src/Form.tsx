import { useState } from "react";
import { submitForm } from "./Submit";
import { validate } from "./Validator";

export interface MyFormData {
    name: string,
    email: string,
    message: string,
}

export const DEFAULT_FORM_DATA: MyFormData = {
    name: "",
    email: "",
    message: "",
}

interface Props {
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
    const submit = () => {
        const trimmed_data: MyFormData = {
            name: data.name.trim(),
            email: data.email.trim(),
            message: data.message.trim(),
        }
        validate(trimmed_data).then((valid) => valid && submitForm(trimmed_data));
    }
    return <div className="form">
        <h2>Name</h2>
        <input id="name" type="text" placeholder="Optional" onChange={onChange("name")} />
        <h2>Email</h2>
        <input id="email" type="text" placeholder="Required for me to respond" onChange={onChange("email")} />
        <h2>Message</h2>
        <textarea placeholder="You can write this message in English or German." onChange={onChange("message")} />
        <button onClick={submit}>Send</button>
    </div>
}

export default Form;