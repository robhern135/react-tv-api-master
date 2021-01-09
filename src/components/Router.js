import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Components
import App from '../App'
import Person from '../components/Person'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} exact />
      {/* anything after : in react router is a parameter,
          you can call it whatever you want              */}
      <Route path="/actor/:id" component={Person} />
    </Switch>
  </BrowserRouter>
);

export default Router;