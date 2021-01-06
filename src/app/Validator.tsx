import { showWarningDialog } from "./Dialogs";
import { MyFormData } from "./Form";

const NO_MESSAGE_TEXT = "Hey,\nit looks as if you have left the message field empty.";
const MAX_TOTAL_SIZE = 32 * 1024;
// According to formcarry customer support their maximum form submission size is 35MiB (35*1024 bytes)
// I did a test, and 68MiB seemed to work too, but lets not rely on that
// Lets be conservative and stay below that (in case they count headers and other stuff)
const OVERSIZE_MESSAGE = `That's A LOT of text. Please keep the total message size below ${Math.round(MAX_TOTAL_SIZE / 1024)} megabytes. If you have big files, just upload them (to Dropbox, Mega.nz, Google drive, etc) and put the link here`;

// SEE SOURCE: https://emailregex.com/
//eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export async function validate(data: MyFormData): Promise<boolean> {
    try {
        // First show the error messages, that can not be bypassed
        if (!data.message) {
            await showWarningDialog("Empty message", NO_MESSAGE_TEXT, false);
        }
        const total_message_size = JSON.stringify(data).length;
        console.log("Actual message size:", total_message_size);
        if (total_message_size >= MAX_TOTAL_SIZE) {
            await showWarningDialog("Message too big", OVERSIZE_MESSAGE, false);
        }

        // Then show the warnings you can skip
        if (!data.email) {
            const NO_EMAIL_TEXT = `Hey,\nit looks as if you have left the email field empty.
                                   You can leave it empty, but then how can I respond to you? If you REALLY cannot give me an email address, please include instruction of how to contact you in the message text`;
            await showWarningDialog("Empty email address", NO_EMAIL_TEXT, true);
        } else if (!EMAIL_REGEX.test(data.email)) {
            const INVALID_EMAIL_ADDRESS = `Hey, the email address you entered (${data.email}) does not look as if it is an email address. If you get this message again, just click "Send anyway".
                                           If you do not give me a valid email address, I will not be able to respond to you.`;
            await showWarningDialog("Potentially invalid email address", INVALID_EMAIL_ADDRESS, true);
        }

        return true;
    } catch (error) {
        console.log("Validate failed with reason:", error);
        return false;
    }
}