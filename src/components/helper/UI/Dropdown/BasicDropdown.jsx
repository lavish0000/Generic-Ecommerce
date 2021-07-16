import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { dropdownThemes } from "../../../../utils/customThemes";

const BasicDropdown = ({ values = [], selectedValue=undefined, value=undefined, containerClassName="", labelClassName="", className="", style={}, width, height, label="", placeholder="", theme="default", required=false, defaultOption=true, useNameValue=false, ...restProps }, ref) => {

  const { t } = useTranslation();
  const { className: themeClassName, containerClassName: themeContainerClassName, style: themeStyle } = dropdownThemes[theme];
  return (
    <div className={`relative ${themeContainerClassName} ${containerClassName}`} style={{ width: (+width || ""), height: (+height || "") }}>
      {label && <label className={`block text-gray-700 text-xs mb-2 uppercase ${labelClassName}`}>{t(label)} {required && "*"}</label>}

      <select
        className={`form-control focus:shadow-outline ${themeClassName} ${className}`}
        style={{ ...themeStyle, ...style}}
        required={required}
        ref={ref}
        defaultValue={(!useNameValue && !value) ? selectedValue || "" : undefined}
        value={useNameValue ? value[restProps.name] || "" : value}
        {...restProps}
      >
      {defaultOption && <option value=""> {(`Select ${t(placeholder || label)}`).toPascalCase()}</option>}
        {values.map(({ name, value, selected = false, disabled = false }, index) => (
          <option key={index} value={value || name} disabled={disabled} //   selected={selectedValue === value || selected || !index} 
>
            {name}
          </option>
        ))}
      </select>
      <i className="fas fa-chevron-down absolute bottom-3 right-2 text-xs"></i>
    </div>
  );
};

export default forwardRef(BasicDropdown);
