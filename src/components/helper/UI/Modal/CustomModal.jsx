import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import CustomButton from './../Button/CustomButton';
import localStrings from '../../../../localisation/localisedStringMapper';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const CustomModal = ({ children, show = false, header = "", actionsButtons = [], showCancelButton = false, cancelButtonText = "", handleModalClose=() => {}, is_route = false, onSubmit }) => {
    
    const [showModal, setShowModal] = useState(show);
    const { t } = useTranslation();
    const history = useHistory()

    const closeModalHandler = () => {
        handleModalClose();
        is_route ? history.goBack() : setShowModal(false);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        onSubmit();
    }

    useEffect(() => {
        !show && closeModalHandler();
         // eslint-disable-next-line
    }, [show]);

    return (
         createPortal(<div className="fixed w-full h-full top-0 left-0 flex items-start justify-center" style={{display: !showModal && "none"}} aria-hidden>
            <div className="absolute w-full h-full bg-gray-900 opacity-50" onClick={closeModalHandler} aria-hidden></div>
            <form className="z-50" onSubmit={submitHandler}>
            <div className="max-w-lg min-w-75 bg-white mx-auto my-8 rounded shadow-lg overflow-y-auto">
                {header && <div className="flex justify-between items-center p-4 border-b border-grey-600">
                    <p className="text-2xl font-medium">{t(header)}</p>
                    <div className="z-50 cursor-pointer" onClick={closeModalHandler}>
                        <i className="fas fa-times"></i>
                    </div>
                </div>}

                <div className="py-4 text-left px-6">
                    {children}
                </div>

                <div className="flex justify-center p-4 border-t border-grey-600">
                    {actionsButtons.map((buttonConfig={}, index) => <CustomButton key={index} text={localStrings.ADD_BUTTON} theme="success" {...buttonConfig} />)}
                    {showCancelButton && <CustomButton text={cancelButtonText || localStrings.CANCEL_BUTTON} theme="cancel" onClick={closeModalHandler} />}
                </div>

            </div>
            </form>
        </div>, document.getElementById("modal_root"))
    )
}

export default CustomModal
