
import React from 'react'

//importing components from react-router-dom
import {Route, Switch} from 'react-router-dom'

//importing navbar from basecomponents
import NavBar from './baseComponents/NavBar';

//importing Home component
import Home from './baseComponents/Home'



const Router = () => (
    <div>

        <NavBar />

        <Switch>
            
            {/* with "exact" property, we get exact representation of component */}
            <Route exact path="/" component={Home}/>
        


        </Switch>
    </div>
)

export default Router;