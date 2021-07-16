import React from "react";
import { useSelector } from "react-redux";

import CustomTable from "../../../helper/UI/Table/CustomTable";
import CustomButton from "../../../helper/UI/Button/CustomButton";

import { TABLE_STORES } from "../../../../utils/tableStructures";
import localStrings from "../../../../localisation/localisedStringMapper";
import PaginationWrapper from "../../../helper/Wrappers/PaginationWrapper/PaginationWrapper";
import { LOADERS } from "../../../../utils/constants";

const StoreBody = ({ stores, total_stores, paginationInputHandler }) => {
    const store = useSelector(state => state.store);
    const loading = store.loader === LOADERS.GET_ALL_STORES;

    return (
        <React.Fragment>
            <PaginationWrapper current={stores.length} total={total_stores} paginationHandler={paginationInputHandler}>

                {!loading && <CustomTable structure={TABLE_STORES} rows={stores} uniquekey="store_id">
                    {(key, store) => {
                        if (key === TABLE_STORES.action.key) return (<div className="flex justify-evenly items-center w-10 ">
                            <CustomButton theme="text-black"><i className="fas fa-pencil-alt"></i></CustomButton>
                            <CustomButton theme="text-black"><i className="far fa-trash-alt"></i></CustomButton>
                        </div>)


                        if (key === TABLE_STORES.store_location.key) return <CustomButton text={localStrings.VIEW_MAP_BUTTON} />

                        if (key === TABLE_STORES.store_address.key) return <React.Fragment>{store.store_line_one_address}<br />{store.store_line_two_address}</React.Fragment>
                    }}
                </CustomTable>}
            </PaginationWrapper>
        </React.Fragment>
    )
}

export default StoreBody
