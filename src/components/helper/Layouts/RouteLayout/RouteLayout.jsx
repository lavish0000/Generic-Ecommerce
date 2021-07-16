import React from 'react'
import { useTranslation } from 'react-i18next'

const RouteLayout = ({route, ...restProps}) => {
    const { t } = useTranslation();
    return (
        <React.Fragment>
        {route.show_header && <div className="py-2.5 border-b-2 border-grey-600"><h2 className="text-3xl font-semibold uppercase">{t(route.key)}</h2></div>}
        <route.component {...restProps} />
        </React.Fragment>
    )
}

export default RouteLayout
