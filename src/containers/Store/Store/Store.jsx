import { useTranslation } from "react-i18next";
import './Store.scss'
import CustomButton from "../../../components/helper/UI/Button/CustomButton"

import localStrings from "../../../localisation/localisedStringMapper"

const Store = () => {
    const { t } = useTranslation();

    return (
        <div className="store">

            <div className="pt-4 border-b-2 border-grey-600 mb-4">

                <div className="flex w-full">
                    <CustomButton theme="cancel"><i className="fas fa-chevron-left"></i> {t(localStrings.BACK_BUTTON)}</CustomButton>
                    <CustomButton className="ml-auto" theme="success"> <i className="fas fa-plus"></i> {t(localStrings.ADD_PRODUCT_BUTTON)}</CustomButton>
                </div>

                <div>
                    <ul className="content-tabs flex mt-3">
                        <li className="active">Store</li>
                        <li>Products</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Store
