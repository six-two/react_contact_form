import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const showWarningDialog = (title: string, message: string, allow_send_anyway: boolean) => {
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

export const showInfoDialog = (title: string, message: string, then?: () => void) => {
    const onClick = then ? then : () => {};
    confirmAlert({
        title,
        message,
        buttons: [
            {
                label: "Ok",
                onClick,
            }
        ]
    })
}
