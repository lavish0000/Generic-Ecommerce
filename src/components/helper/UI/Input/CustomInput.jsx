import { forwardRef } from "react";
import { useTranslation } from "react-i18next"
import { inputThemes } from "../../../../utils/customThemes";

const CustomInput = ({ containerClassName="", labelClassName="", className="", style={}, width, height, type="text", label="", value=undefined, placeholder="", error= "", theme="default", useNameValue=false, ...restProps }, ref) => {
    
    const { t } = useTranslation();
    const {className: themeClassName, containerClassName: themeContainerClassName, style: themeStyle} = inputThemes[theme];

    return (
        <div className={`${themeContainerClassName} ${containerClassName}`}>
        {label && <label className={`block text-gray-700 text-xs mb-2 uppercase ${labelClassName}`}>{t(label)}{restProps.required && "*"}</label>}
        <input 
        className={`form-control focus:shadow-outline ${themeClassName} ${className}`} 
        style={{ ...themeStyle,...style, width: (+width || ""), height: (+height || "")}} 
        type={type} 
        placeholder={t(placeholder)} 
        onKeyDown={(e) => e.code === 13 && e.preventDefault()}
        value={useNameValue ? value[restProps.name] || "" : value}
        {...restProps}
        ref={ref}
        />
        {error && <p className="text-red-500 text-xs italic">{t(error)}</p>}
        </div>
    )
}

export default forwardRef(CustomInput)
