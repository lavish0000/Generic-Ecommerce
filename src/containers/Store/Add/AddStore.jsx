import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CustomModal from './../../../components/helper/UI/Modal/CustomModal';
import CustomInput from './../../../components/helper/UI/Input/CustomInput';
import BasicDropdown from './../../../components/helper/UI/Dropdown/BasicDropdown';
import GoogleAutoComplete from '../../../components/common/GoogleAutoComplete/GoogleAutoComplete';

import { addStore } from '../../../store/actions';

import localStrings from '../../../localisation/localisedStringMapper';
import countries from './../../../assests/json/countries-states-cities.json';
import islands from './../../../assests/json/islands.json';
import { LOADERS } from '../../../utils/constants';

const commonConfig = {theme:"standard", labelClassName:"font-bold"};
const dropdownConfig = {selectedValue:"1", width:"204", ...commonConfig};

const AddStore = () => {

    const inputRef = useRef({store_location: "development", store_lat: "0.00", store_long: "0.00"});
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const dispatch = useDispatch();
    const store = useSelector(state => state.store);
    const history = useHistory();
    const loading = store.loader === LOADERS.ADD_STORE;

    const statesHandler = (value) => {
        const states = value ? countries.find((country) => country.name === value).states : [];
        setStates(states)
        setCities([]);
    }

    const citiesHandler = (value) => {
        const cities = value ? states.find((state) => state.name === value).cities : [];
        setCities(cities)
    }

    const inputHandler = (e) => {
        const {name, value} = e.target;
        const previousValue = inputRef.current[name];
        inputRef.current[name] = value;

        if (previousValue !== value) {
            name === "store_country" && statesHandler(value);
            name === "store_state" && citiesHandler(value);
        }
    }

    const mapLocationHandler = ({name, lat, lng}) => {
        inputRef.current.store_location = name;
        inputRef.current.store_lat = lat;
        inputRef.current.store_long = lng;
    }

    const submitHandler = () => {
        const payload = {...inputRef.current};
        const responseFunction = () => history.push("/stores")
        dispatch(addStore(payload, responseFunction));
    }

    return (
        <CustomModal show showCancelButton header={localStrings.ADD_STORE_ROUTE_HEADER} actionsButtons={[{type:"submit", loading, disabled:loading}]} is_route onSubmit={submitHandler}>

        <div className="flex justify-between w-104">
        <CustomInput name="store_name" label={localStrings.STORE_NAME_LABEL} required onChange={inputHandler} {...commonConfig} />
        <CustomInput name="store_line_one_address" label={localStrings.STORE_ADDRESS_LABEL} required onChange={inputHandler} {...commonConfig}/>
        </div>

        <div className="flex justify-between w-104">
        <CustomInput name="store_line_two_address" label={localStrings.STORE_ADDRESS_2_LABEL} required onChange={inputHandler} {...commonConfig}/>
        <BasicDropdown name="store_country" label={localStrings.COUNTRY_LABEL} values={countries} required onChange={inputHandler} {...dropdownConfig} />
        </div>

        <div className="flex justify-between w-104">
        {!!states.length && <BasicDropdown name="store_state" label={localStrings.STATE_PROVINCE_LABEL} values={states || []} required onChange={inputHandler} {...dropdownConfig} />}
        {!!cities.length && <BasicDropdown name="store_city" label={localStrings.CITY_LABEL} values={cities} required onChange={inputHandler} {...dropdownConfig} />}
        </div>

        <div className="flex justify-between w-104">
        <CustomInput name="postal_code" label={localStrings.POSTAL_CODE_LABEL} type="number" required onChange={inputHandler} {...commonConfig}/>
        <BasicDropdown name="island_location" label={localStrings.ISLAND_LOCATION_LABEL} values={islands} onChange={inputHandler} {...dropdownConfig} />
        </div>

        <GoogleAutoComplete onChange={mapLocationHandler}>
        {(clearSearchBox, inputRef) => <CustomInput label={localStrings.STORE_LOCATION_LABEL} ref={inputRef} onFocus={clearSearchBox} required {...commonConfig} />}
        </GoogleAutoComplete>

        </CustomModal>
    )
}

export default AddStore
