import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import routing from './../../../../routing';

import "./SidebarLayout.scss";
import placeholder from '../../../../assests/images/profile-placeholder.png'

const SidebarLayout = () => {
    const { t } = useTranslation()
    return (
        <nav id="sidebar">

            <ul className="components">
                {routing.ROUTES.map(({ path, icon, is_sidebar, key }) =>
                    is_sidebar && <NavLink key={key} to={path} activeClassName="active">
                        <li>
                            <span><i className={icon}></i></span>
                            <p>{t(key)}</p>
                        </li>
                    </NavLink>)}
            </ul>

            <ul className="profile w-full">
                <li className="profile-pic">
                    <div className="dropdown">
                        <img src={placeholder} alt="profile_img" />
                    </div>


                </li>

                <li>
                    <span><i className="fas fa-cog"></i></span>
                </li>

                <li>
                    <span><i className="fas fa-sign-out-alt"></i></span>
                </li>

            </ul>
        </nav>
    )
}

export default SidebarLayout
