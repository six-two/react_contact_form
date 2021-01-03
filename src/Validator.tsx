import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MyFormData } from "./Form";

// TODO read up on async, await, Promises, etc

const showNoEmailWarning = (resolve: any, reject: any) => {
    confirmAlert({
        title: 'Missing email address',
        message: `Hey,\nit looks as if you have left the email field empty.
        You can leave it empty, but then how can I respond to you? If you REALLY cannot give me an email address, please include instruction of how to contact you in the message text`,
        buttons: [
            {
                label: 'Send anyway',
                onClick: resolve(),
            },
            {
                label: 'Go back',
                onClick: reject(),
            }
        ]
    });
}

export const validate = (data: MyFormData): boolean => {
    // return new Promise((resolve: any, reject: any) => {
    //     if ()
    // });
    // if (!data.email) {
    //     showNoEmailWarning();
    // }
    return true;
}