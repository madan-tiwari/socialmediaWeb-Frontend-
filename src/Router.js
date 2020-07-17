
import React from 'react'

//importing components from react-router-dom
import {Route, Switch} from 'react-router-dom'

//importing navbar from basecomponents
import NavBar from './baseComponents/NavBar';

//importing Home component
import Home from './baseComponents/Home'
import Signup from './user/Signup'
import Login from './user/Login'

import Users from './user/Users'




const Router = () => (
    <div>

        <NavBar />

        <Switch>
            
            {/* with "exact" property, we get exact representation of component */}
            <Route exact path="/" component={Home}/>
            <Route exact path="/users" component={Users}/>
            <Route exact path="/register" component={Signup}/>
            <Route exact path="/login" component={Login}/>
        
        </Switch>
    </div>
)

export default Router;