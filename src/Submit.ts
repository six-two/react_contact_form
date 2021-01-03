import axios from "axios";
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
const DEVELOPMENT_SUBMIT_URL = "";


const getSubmitUrl = () => {
    if (PRODUCTION_HOST) {
        const isProduction = window.location.hostname.endsWith(PRODUCTION_HOST);
        return isProduction ? PRODUCTION_SUBMIT_URL : DEVELOPMENT_SUBMIT_URL;
    } else {
        return PRODUCTION_SUBMIT_URL;
    }
}


export const submitForm = (data: MyFormData) => {
    console.log("Posting form data:", data);
    const post_url = getSubmitUrl();
    if (post_url) {
        axios
            .post(
                post_url,
                data,
                {
                    headers: {
                        Accept: "application/json"
                    }
                }
            )
            .then((response: any) => {
                console.log("Form submit response:", response);
                /* Response looks like the following object: 

config: Object { url: "https://getform.io/f/d709b72b-d30b-4316-9cc1-4d1d33778a8b", method: "post", data: "{\"name\":\"n\",\"email\":\"e\",\"message\":\"m\"}", … }
​
data: Object { success: true, formValues: [] }
​
headers: Object { "cache-control": "no-cache, private", "content-type": "application/json" }
​
request: XMLHttpRequest { readyState: 4, timeout: 0, withCredentials: false, … }
​
status: 200
​
statusText: "OK"
​
<prototype>: Object { … } */
            })
            .catch((error: any) => {
                console.error("An error occured while submitting the form:", error);
            });
    } else {
        console.warn("The submit URL is empty, so no data were posted");
    }
}