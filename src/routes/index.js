import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Auth from '../services/auth'

import Error            from '../pages/Error';
import NotImplemented   from '../pages/NotImplemented';
import Login            from '../pages/Login';
import Register         from '../pages/Register';
import Home             from '../pages/Home';
import KidDashboard     from '../pages/KidDashboard';
import NewKid           from '../pages/NewKid';
import EditMeasures     from '../pages/EditMeasures';
import NewVaccine       from '../pages/NewVaccine';
import EditVaccine      from '../pages/EditVaccine';

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
            <PrivateRoute   exact path='/' component={Home}/>
            <PrivateRoute   exact path='/kid/detail/:id' component={KidDashboard}/>
            <PrivateRoute   exact path='/kid/detail/:id/pediatrics' component={KidDashboard}/>
            <PrivateRoute   exact path='/kid/detail/:id/measures' component={KidDashboard}/>
            <PrivateRoute   exact path='/kid/detail/:id/vaccines' component={KidDashboard}/>
            <PrivateRoute   exact path='/kid/new' component={NewKid}/>
            <PrivateRoute   exact path='/measure/:id' component={EditMeasures}/>
            <PrivateRoute   exact path='/vaccine/:id' component={EditVaccine}/>
            <PrivateRoute   exact path='/vaccine/new/:id' component={NewVaccine}/>
            <Route          exact path='/login' component={Login}/>
            <Route          exact path='/register' component={Register}/>
            <Route          exact path='/NotImplemented' component={NotImplemented}/>
            <PrivateRoute   exact path='*' component={Error}/>
        </Switch>
      </BrowserRouter>
    );
  }