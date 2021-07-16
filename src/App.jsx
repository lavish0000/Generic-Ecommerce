import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import AuthLayout from "./components/helper/Layouts/AuthLayout/AuthLayout";
import MainLayout from "./components/helper/Layouts/MainLayout/MainLayout";

import "./App.css";

import routing from "./routing";
import { authCheckState } from "./store/actions/auth";
import "./utils/customPrototypes";

const { RenderRoutes, ROUTES } = routing;

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const Layout = auth.access_token ? MainLayout : AuthLayout;

  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);

  return (
    <div className="App">
      {auth.auth_check_state && (
        <Layout>
          <RenderRoutes routes={ROUTES} />
        </Layout>
      )}
    </div>
  );
}

export default App;
