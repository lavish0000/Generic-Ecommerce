import { useTranslation } from "react-i18next";
import { useRouteMatch, NavLink } from "react-router-dom";

import CustomInput from "./../../../helper/UI/Input/CustomInput";
import CustomButton from "./../../../helper/UI/Button/CustomButton";
import BasicDropdown from "./../../../helper/UI/Dropdown/BasicDropdown";
import localStrings from './../../../../localisation/localisedStringMapper';

import countries from './../../../../assests/json/countries-states-cities.json';
import islands from './../../../../assests/json/islands.json';

const StoreHeader = ({inputValues=[], filtersAppliedCount, inputHandler, applyFiltersHandler, clearFiltersHandler}) => {
    const { t } = useTranslation();
    const match = useRouteMatch();

    const commonConfig = {onChange:inputHandler, value:inputValues, useNameValue: true, width:150};

    return (
        <div className="flex py-4 border-b-2 border-grey-600">
            <div className="justify-between flex w-288">
                <CustomInput name="store_id"  placeholder={localStrings.STORE_ID_PLACEHOLDER} type="number" {...commonConfig} />
                <CustomInput name="search_string" placeholder={localStrings.STORE_NAME_PLACEHOLDER} {...commonConfig} />
                <CustomInput name="store_address" placeholder={localStrings.STORE_ADDRESS_PLACEHOLDER} {...commonConfig} />
                <BasicDropdown name="store_country" placeholder={localStrings.COUNTRY_PLACEHOLDER} values={countries} {...commonConfig} />
                <CustomInput name="postal_code" placeholder={localStrings.POSTAL_CODE_PLACEHOLDER} type="number" {...commonConfig} />
                <CustomInput name="start_date" placeholder={localStrings.DATE_RANGE_PLACEHOLDER} {...commonConfig} />
                <BasicDropdown name="island_location" placeholder={localStrings.ISLAND_LOCATION_PLACEHOLDER} values={islands} {...commonConfig} />
            </div>
            <div className="ml-auto justify-between flex h-full w-85">
                <CustomButton text={localStrings.APPLY_BUTTON} theme={!!filtersAppliedCount ? "success" : "cancel"} disabled={!Object.values(inputValues).find(Boolean)} onClick={applyFiltersHandler}>{!!filtersAppliedCount && `(${filtersAppliedCount})`}</CustomButton>
                <CustomButton text={localStrings.CLEAR_ALL_BUTTON} theme="cancel" disabled={!filtersAppliedCount} onClick={clearFiltersHandler} />
                <NavLink to={`${match.url}/add`}><CustomButton theme="success"><i className="fas fa-plus"></i> {t(localStrings.ADD_STORE_BUTTON)}</CustomButton></NavLink>
            </div>
        </div>
    )
}

export default StoreHeader
