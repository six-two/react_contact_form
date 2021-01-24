import { confirmAlert } from "react-confirm-alert";
import { IntlShape } from 'react-intl';
import "react-confirm-alert/src/react-confirm-alert.css";

export const showWarningDialog = (intl: IntlShape, title_id: string, message_id: string, allow_send_anyway: boolean) => {
    const go_back_text = intl.formatMessage({ id: "go_back" });
    const title = intl.formatMessage({ id: title_id });
    const message = intl.formatMessage({ id: message_id });
    return new Promise(
        (resolve: any, reject: any) => {
            const buttons = [{
                label: go_back_text,
                onClick: () => reject(`User chose '${go_back_text}' in '${title}' dialog`),
            }];
            if (allow_send_anyway) {
                buttons.push({
                    label: intl.formatMessage({ id: "send_anyway" }),
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

export const showInfoDialog = (intl: IntlShape, title_id: string, message_id: string, then?: () => void) => {
    const onClick = then ? then : () => { };
    const ok = intl.formatMessage({ id: "ok" });
    const title = intl.formatMessage({ id: title_id });
    const message = intl.formatMessage({ id: message_id });
    confirmAlert({
        title,
        message,
        buttons: [{
            label: ok,
            onClick,
        }]
    })
}
