import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

import localStrings from "../../../../localisation/localisedStringMapper";

const Recaptcha = ({value, verifyHandler}) => {
  const { t } = useTranslation();

  const onChange = (value) => {
    verifyHandler({value, error: !value});
  };
  return (
    <div className="mb-4">
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_PUBLIC_KEY}
        
        size="normal"
        onChange={onChange}
      />
      {value?.error && <p className="text-red-500 text-xs italic">{t(localStrings.RECAPTCHA_ERROR)}</p>}
    </div>
  );
};

export default Recaptcha;
