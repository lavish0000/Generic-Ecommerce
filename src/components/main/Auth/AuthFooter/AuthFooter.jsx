import CustomButton from '../../../helper/UI/Button/CustomButton';

import localStrings from '../../../../localisation/localisedStringMapper';



const AuthFooter = ({screenHandler}) => {
    return (
        <div className="mb-0 flex items-center">
        <div>
        <CustomButton text={localStrings.BACK_TO_LOGIN_BUTTON} theme="text" onClick={screenHandler}/>
        </div>
        <CustomButton text={localStrings.RESEND_OTP_BUTTON} theme="text" className="ml-auto"/>
        </div>
    )
}

export default AuthFooter
