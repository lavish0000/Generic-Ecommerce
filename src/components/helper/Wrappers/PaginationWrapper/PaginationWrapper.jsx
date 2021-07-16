import './PaginationWrapper.scss'
import BasicDropdown from "../../UI/Dropdown/BasicDropdown";
import { useState } from 'react';
import CustomButton from '../../UI/Button/CustomButton';

const defaultLimit = 5;

const PaginationWrapper = ({ children, current, total=defaultLimit, paginationHandler }) => {

    const [limit, setLimit] = useState(defaultLimit);
    const [offset, setOffset] = useState(0);
    const currentPage = (offset/(limit || defaultLimit)) + 1
    const totalPages = Math.ceil(total/(limit || defaultLimit));

    const inputHandler = (e) => {
        setLimit(e.target.value);
        paginationHandler({limit: e.target.value})
    };

    const offsetHandler = (offset) => {
        setOffset(offset);
        paginationHandler({offset})
    };
console.log({totalPages})
    return (
        <div>

            <div className="flex items-center p-4 text-sm border-b-2 border-grey-600">
                <div>
                    <p>Showing {current} of {total || 0} Results</p>
                </div>
                <div className="ml-auto flex items-center">
                    <p>Result per page:</p>
                    <BasicDropdown name="limit" value={limit} containerClassName="ml-2" width="50" values={new Array(5).fill(0).map((_, index) => ({ name: (index + 1) * defaultLimit }))} defaultOption={false} onChange={inputHandler} />
                </div>
            </div>

            {children}
            <div className="text-center">
                <div className="pagination">
                <CustomButton theme="text" onClick={() => offsetHandler(0)}><i className="fas fa-angle-double-left"></i></CustomButton>
                    <CustomButton theme="text" onClick={() => offsetHandler(offset - limit)}><i className="fas fa-angle-left"></i></CustomButton>
                    {new Array(Math.min(totalPages, defaultLimit)).fill(0).map((_, index) => <CustomButton theme="text" className="active">{currentPage + index}</CustomButton>)}
                    <CustomButton theme="text" onClick={() => offsetHandler(offset + limit)}><i className="fas fa-angle-right"></i></CustomButton>
                    <CustomButton theme="text" onClick={() => offsetHandler(total)}><i className="fas fa-angle-double-right"></i></CustomButton>
                </div>
            </div>

        </div>
    )
}

export default PaginationWrapper
