import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Auth from '../services/auth'

import Error from '../pages/Error';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import KidDashboard from '../pages/KidDashboard';
import ItemRegister from '../pages/ItemRegister';
import ItemEdit from '../pages/ItemEdit';


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
            <PrivateRoute exact path='/' component={Home}/>
            <PrivateRoute exact path='/item/edit/:id' component={ItemEdit}/>
            <PrivateRoute exact path='/item/detail/:id' component={KidDashboard}/>
            <PrivateRoute exact path='/item/register' component={ItemRegister}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <PrivateRoute exact path='*' component={Error}/>
        </Switch>
      </BrowserRouter>
    );
  }