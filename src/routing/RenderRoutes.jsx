import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import RouteLayout from './../components/helper/Layouts/RouteLayout/RouteLayout'

function RenderRoutes({ routes = [], parentRoute = {}, isModalRoute = false }) {
  const auth = useSelector(state => state.auth);
  let defaultRoute = "";
  const modalRoutes = !isModalRoute ? routes.filter((route = {}) => route.is_modal) : [];
  const commonRoutes = isModalRoute ? routes : routes.filter((route = {}) => !route.is_modal);

  return (
    <React.Fragment>
      {commonRoutes.map(({ routes = [], ...route }, index) => {
        if (!!auth.access_token !== route.is_protected) return null;
        const parent = { ...route, path: [...new Set([(parentRoute.path || ""), route.path])].join("") };
        if (!defaultRoute) defaultRoute = route.is_default && route.path;

        return routes.length ? (
          <RenderRoutes
            key={route.key}
            routes={[route, ...routes]}
            parentRoute={parent}
          />
        ) : (
          <Route
            key={route.key}
            path={[parentRoute.path || "", ((index || !parentRoute.path || isModalRoute) && route.path) || ""].join("")}
            exact={route.exact}
            render={(props) => <React.Fragment>
              <RouteLayout {...props} route={route} />
              {!!modalRoutes.length && !index && <RenderRoutes routes={modalRoutes} parentRoute={parent} isModalRoute />}
            </React.Fragment>}
          />
        );
      })}
      {defaultRoute && <Redirect to={defaultRoute} />}
    </React.Fragment>
  );
}

export default memo(RenderRoutes, (prev, next) => prev.parentRoute?.path === next.parentRoute?.path);
