import localStrings from "../localisation/localisedStringMapper"
import { LOGIN_SCREENS } from "./constants"


export const loginScreenMapper = {
    [LOGIN_SCREENS.CREDENTIALS_VERIFICATION]: {
        heading: localStrings.LOGIN_HEADER,
        showRecaptcha: true,
        buttonText: localStrings.SUBMIT_BUTTON,
        inputs: [
        {
            label: localStrings.EMAIL_LABEL,
            type: "email",
            name: "email",
            placeholder: localStrings.LOGIN_EMAIL_PLACEHOLDER,
            required: true,
        },
        {
            label: localStrings.PASSWORD_LABEL,
            type: "password",
            name: "password",
            placeholder: "******",
            required: true,
        }
    ]
            },
    [LOGIN_SCREENS.OTP_VERIFICATIONS]: {
        heading: localStrings.AUTHORIZATION_HEADER,
        showRecaptcha: false,
        buttonText: localStrings.LOGIN_BUTTON,
        inputs: [
        {
            label: localStrings.EMAIL_OTP_LABEL,
            type: "number",
            name: "email_otp",
            placeholder: "****",
            required: true,
        },
        {
            label: localStrings.PHONE_OTP_LABEL,
            type: "number",
            name: "phone_otp",
            placeholder: "****",
            required: true,
        }
    ]
    }
}