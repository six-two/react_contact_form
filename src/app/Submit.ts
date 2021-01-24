import axios from "axios";
import { IntlShape } from 'react-intl';
import { showInfoDialog } from "./Dialogs";
import { MyFormData } from "./Form";

// ================== YOU WILL NEED TO ADJUST SOME OF THESE VALUES! ==========================

// If the current url has a domain that ends with this string, then use PRODUCTION_SUBMIT_URL.
// Otherwise DEVELOPMENT_SUBMIT_URL will be used.
// Leave this field empty, to always use the PRODUCTION_SUBMIT_URL.
const PRODUCTION_HOST = "six-two.dev";

// The backend URL, to which the data should be posted (in a production environment)
// CHANGE THIS VALUE, otherwise I will receive your data
const PRODUCTION_SUBMIT_URL = "https://formcarry.com/s/mhlqebsaCq";
// The backend URL, to which the data should be posted (in a development environment).
// Leave this field empty, to not post the data
const DEVELOPMENT_SUBMIT_URL = "https://httpbin.org/status/200";


const getSubmitUrl = () => {
    if (PRODUCTION_HOST) {
        const isProduction = window.location.hostname.endsWith(PRODUCTION_HOST);
        return isProduction ? PRODUCTION_SUBMIT_URL : DEVELOPMENT_SUBMIT_URL;
    } else {
        return PRODUCTION_SUBMIT_URL;
    }
}

async function internalPostData(intl: IntlShape, post_url: string, data: MyFormData) {
    try {
        const response = await axios.post(
            post_url,
            data,
            {
                headers: {
                    Accept: "application/json"
                }
            }
        );
        console.log("Form submit response:", response);
        if (response.status === 200) { // They use "response.data.success" in the docs
            showInfoDialog(intl, "success", "message_sent");
        } else {
            showInfoDialog(intl, "backend_error", "backend_error_description");
        }
    } catch (error) {
        console.error("An error occured while posting the form data:", error);
        showInfoDialog(intl, "internal_error", "backend_error_description");
    }
}

export const submitForm = (intl: IntlShape, data: MyFormData) => {
    console.log("Posting form data:", data);
    const post_url = getSubmitUrl();
    if (post_url) {
        internalPostData(intl, post_url, data);//Ignore the promise
    } else {
        console.warn("The submit URL is empty, so no data were posted");
    }
}