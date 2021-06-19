import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Auth from '../services/auth'

import Error            from '../pages/Error';
import Pending   from '../pages/Pending';
import Login            from '../pages/Login';
import Register         from '../pages/Register';
import Home             from '../pages/Home';
import KidDashboard     from '../pages/KidDashboard';
import KidNew           from '../pages/KidNew';
import MeasuresEdit     from '../pages/MeasuresEdit';
import VaccineNew       from '../pages/VaccineNew';
import VaccineEdit      from '../pages/VaccineEdit';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        Auth.isAuthenticated() ? ( 
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        )
    )} />
)

export default function Routes() {
    return (
      <BrowserRouter>
        <Switch>
            <PrivateRoute   exact path='/'                          component={Home}/>
            <PrivateRoute   exact path='/kid/detail/:id'            component={KidDashboard}/>
            <PrivateRoute   exact path='/kid/detail/:id/pediatrics' component={KidDashboard}/>
            <PrivateRoute   exact path='/kid/detail/:id/measures'   component={KidDashboard}/>
            <PrivateRoute   exact path='/kid/detail/:id/vaccines'   component={KidDashboard}/>
            <PrivateRoute   exact path='/kid/new'                   component={KidNew}/>
            <PrivateRoute   exact path='/measure/:id'               component={MeasuresEdit}/>
            <PrivateRoute   exact path='/vaccine/:id'               component={VaccineEdit}/>
            <PrivateRoute   exact path='/vaccine/new/:id'           component={VaccineNew}/>
            <Route          exact path='/login'                     component={Login}/>
            <Route          exact path='/register'                  component={Register}/>
            <Route          exact path='/Pending'                   component={Pending}/>
            <PrivateRoute   exact path='*'                          component={Error}/>
        </Switch>
      </BrowserRouter>
    );
  }