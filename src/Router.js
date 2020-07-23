import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";

import React from 'react'

//importing components from react-router-dom
import {Route, Switch} from 'react-router-dom'

//importing navbar from basecomponents
import NavBar from './baseComponents/NavBar';

//importing Home component
import Home from './baseComponents/Home'
import Signup from './user/Signup'
import Login from './user/Login'
import Profile from './user/Profile'
import Users from './user/Users'
import EditProfile from './user/EditProfile'

import NewPost from './post/NewPost'
import PostDetails from './post/PostDetails'
import UpdatePost from './post/UpdatePost'


import FindPeople from './followUnfollowComponent/FindPeople'

//Protected routes
import ProtectedRoutes from './auth/ProtectedRoutes'

import Admin from './admin/Admin'




const Router = () => (
    <div>

        <NavBar />

        <Switch>
            
            {/* with "exact" property, we get exact representation of component */}
            <Route exact path="/" component={Home}/>
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <ProtectedRoutes exact path="/admin" component={Admin} />

            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
            <ProtectedRoutes exact path="/post/create" component={NewPost}/>
            <Route exact path="/post/:postId" component={PostDetails}/>
            <ProtectedRoutes exact path="/post/update/:postId" component={UpdatePost}/>
           
           
            <Route exact path="/users" component={Users}/>
            <Route exact path="/register" component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <ProtectedRoutes exact path="/user/edit/:userId" component={EditProfile}/>
            <ProtectedRoutes exact path="/findpeople" component={FindPeople}/>
            <ProtectedRoutes exact path="/user/:userId" component={Profile}/>



        </Switch>
    </div>
)

export default Router;