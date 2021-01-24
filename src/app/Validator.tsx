import { IntlShape } from 'react-intl';
import { showWarningDialog } from "./Dialogs";
import { MyFormData } from "./Form";

const MAX_TOTAL_SIZE = 32 * 1024;
// According to formcarry customer support their maximum form submission size is 35MiB (35*1024 bytes)
// I did a test, and 68MiB seemed to work too, but lets not rely on that
// Lets be conservative and stay below that (in case they count headers and other stuff)

// SEE SOURCE: https://emailregex.com/
//eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export async function validate(intl: IntlShape, data: MyFormData): Promise<boolean> {
    try {
        // First show the error messages, that can not be bypassed
        if (!data.message) {
            await showWarningDialog(intl, "empty_message_title", "empty_message_description", false);
        }
        const total_message_size = JSON.stringify(data).length;
        console.log("Actual message size:", total_message_size);
        if (total_message_size >= MAX_TOTAL_SIZE) {
            await showWarningDialog(intl, "oversize_message_title", "oversize_message_description", false);
        }

        // Then show the warnings you can skip
        if (!data.email) {
            await showWarningDialog(intl, "empty_email_title", "empty_email_description", true);
        } else if (!EMAIL_REGEX.test(data.email)) {
            await showWarningDialog(intl, "invalid_email_title", "invalid_email_description", true);
        }

        return true;
    } catch (error) {
        console.log("Validate failed with reason:", error);
        return false;
    }
}