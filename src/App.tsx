/* eslint-disable react/jsx-pascal-case */
import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Spinner from "./shared/components/Spinner/Spinner";
import { PAGES } from "./shared/constants/navigation";

const App: React.FC = () => {
  const routes = (
    <Suspense fallback={<Spinner show />}>
      <Switch>
        {PAGES.map((page: any) => (
          <Route
            key={page.path}
            exact
            path={page.path}
            render={(p) => <page.render {...p} />}
          />
        ))}

        <Redirect to="/" />
      </Switch>
    </Suspense>
  );

  return <Layout>{routes}</Layout>;
};

export default App;
