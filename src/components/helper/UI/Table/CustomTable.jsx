import { useTranslation } from "react-i18next"

const CustomTable = ({ structure = {}, rows = [], children=()=>{}, uniquekey=""}) => {
    const {t} = useTranslation();
    return (
        <div className="flex flex-col">
            <div className="mb-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="pb-2 align-middle inline-block w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden sm:rounded-lg">
                        <table className="w-full divide-y divide-gray-200 table-striped">
                            <thead className="bg-tr bg-">
                                <tr>

                                    {Object.values(structure).map(({ header }) =>
                                        <th
                                            key={header}
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-r border-gray-200"
                                        >
                                            {t(header)}
                                        </th>)}

                                </tr>
                            </thead>
                            <tbody>

                                {rows.map((row) => (
                                    <tr key={row[uniquekey]}>

                                        {Object.values(structure).map(({ key }) =>
                                            <td key={key} className="px-6 py-4 whitespace-nowrap border-r border-gray-200 text-xs">
                                                {children(key, row) || row[key]}
                                            </td>)}

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomTable
