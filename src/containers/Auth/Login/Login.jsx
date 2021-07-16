import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Card from './../../../components/helper/UI/Card/Card'
import CustomInput from './../../../components/helper/UI/Input/CustomInput';
import CustomButton from './../../../components/helper/UI/Button/CustomButton';
import Recaptcha from './../../../components/main/Auth/Recaptcha/Recaptcha';
import AuthFooter from './../../../components/main/Auth/AuthFooter/AuthFooter'

import { LOGIN_SCREENS } from '../../../utils/constants';
import { loginScreenMapper } from '../../../utils/mappers';
import { authCredentials, authVerify } from '../../../store/actions';


const Login = () => {
    const inputRef = useRef({email: "", password: ""});
    const [recaptcha, setRecaptcha] = useState({error: false, value: null});
    const [currentScreen, setCurrentScreen] = useState(LOGIN_SCREENS.CREDENTIALS_VERIFICATION);

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const history = useHistory();

    const {heading = "", inputs = [], showRecaptcha = false, buttonText = ""} = loginScreenMapper[currentScreen];



    const inputHandler = (e) => {
        const {name, value} = e.target;
        inputRef.current[name] = value;
    }

    const resetInputHandler = () => {
        inputRef.current = {};
    }

    const backToLoginScreenHandler = () => {
        setCurrentScreen(LOGIN_SCREENS.CREDENTIALS_VERIFICATION);
        setRecaptcha({value: null, error: false});
        resetInputHandler();
    }

    const credentialsVerificationHandler = () => {
        const payload = {...inputRef.current};
        const responseFunction = (response) => {
            inputRef.current = response;
            setCurrentScreen(LOGIN_SCREENS.OTP_VERIFICATIONS);
        }
        dispatch(authCredentials(payload, responseFunction));
    }

    const otpVerificationHandler = () => {
        const payload = {...inputRef.current};
        const responseFunction = () => history.push("/stores")
        dispatch(authVerify(payload, responseFunction));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!recaptcha.value && !recaptcha.error) return setRecaptcha((currState) => ({...currState, error: true}));
        currentScreen === LOGIN_SCREENS.CREDENTIALS_VERIFICATION ? credentialsVerificationHandler() : otpVerificationHandler();
    }

    return (
        <Card heading={heading}>
        <form onSubmit={submitHandler}>
        {inputs.map((input) => <CustomInput key={input.name} theme="standard" defaultValue={inputRef.current[input.name]} onChange={inputHandler} {...input}/>)}
        {showRecaptcha && <Recaptcha value={recaptcha} verifyHandler={setRecaptcha} />}
        <CustomButton text={buttonText} type="submit" className="w-full mb-6" loading={auth.loader} disabled={auth.loader}/>
        {currentScreen === LOGIN_SCREENS.OTP_VERIFICATIONS && <AuthFooter screenHandler={backToLoginScreenHandler}/>}
        </form>
        </Card>
    )
}

export default Login
