import React from "react";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { buttonThemes } from "../../../../utils/customThemes"

const CustomButton = ({ children, text = "", type = "button", className = "", style = {}, width, height, theme = "default", loading = false, ...restProps }, ref) => {
    const { t } = useTranslation();
    const [themeName, color = ""] = theme.split("-");
    const { style: themeStyle = {}, className: themeClassName = "" } = buttonThemes[themeName];
    const loader = <i className="fas fa-circle-notch fa-spin"></i>;

    return (
        <button
            type={type}
            className={(`${themeClassName} ${className} active:opacity-80 focus:outline-none cursor-pointer`).trim()}
            style={{ ...themeStyle, ...style, width: (+width || ""), height: (+height || ""), color }}
            {...restProps}
            ref={ref}>
            {loading ? loader : <React.Fragment>{t(text)}  {children}</React.Fragment>}
        </button>
    )
}

export default forwardRef(CustomButton);
