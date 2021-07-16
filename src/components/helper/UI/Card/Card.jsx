import { useTranslation } from "react-i18next"

const Card = ({children, className = "", style = {}, heading = ""}) => {
    const { t } = useTranslation();
    return (
        <div className={`${className} bg-white rounded-xl p-5 w-96 shadow-md`} style={style}>
        <h4 className="text-center mb-6 text-2xl font-semibold uppercase">{t(heading)}</h4>
           {children} 
        </div>
    )
}

export default Card
