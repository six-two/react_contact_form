import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MyFormData } from "./Form";

const INVALID_EMAIL_ADDRESS = `Hey,
the email address you entered does not look as if it is a valid email address. Please check it again. If you get this message again, just click "Send anyway".

If you do not give me a valid email address, I will not be able to respond to you.`;
const NO_EMAIL_TEXT = `Hey,\nit looks as if you have left the email field empty.
You can leave it empty, but then how can I respond to you? If you REALLY cannot give me an email address, please include instruction of how to contact you in the message text`;
const NO_MESSAGE_TEXT = "Hey,\nit looks as if you have left the message field empty.";

// SEE SOURCE: https://emailregex.com/
//eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const showWarningDialog = (title: string, message: string, allow_send_anyway: boolean) => {
    const go_back_text = 'Go back';
    return new Promise(
        (resolve: any, reject: any) => {
            const buttons = [
                {
                    label: go_back_text,
                    onClick: () => reject(`User chose '${go_back_text}' in '${title}' dialog`),
                }
            ];
            if (allow_send_anyway) {
                buttons.push({
                    label: 'Send anyway',
                    onClick: () => resolve(),
                });
            }
            confirmAlert({
                title,
                message,
                buttons,
            });
        }
    );
}

export async function validate(data: MyFormData): Promise<boolean> {
    try {
        if (!data.message) {
            await showWarningDialog("Empty message", NO_MESSAGE_TEXT, false);
        }
        if (!data.email) {
            await showWarningDialog("Empty email address", NO_EMAIL_TEXT, true);
        } else if (!EMAIL_REGEX.test(data.email)){
            await showWarningDialog("Potentially invalid email address", INVALID_EMAIL_ADDRESS, true);
        }
        return true;
    } catch (error) {
        console.log("Validate failed with reason:", error);
        return false;
    }
}