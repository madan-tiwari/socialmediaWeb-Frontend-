//Using {Link} component from react-router-dom instead of anchor tag as it reloads the page
//enables us to navigate around dynamically based on component
import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'

//helper method for active status
const isActive = (history, path)=>{
   if(history.location.pathname === path){
       return {color: "#F39C12"}
   }else{
       return {color: "#ffffff"}
   }
}






//functional component, as we dont need state to create class component
const NavBar =  ({history}) => (
   <div>
      <ul className="nav nav-tabs bg-primary">
           <li className="nav-item">
               <Link className ="nav-link" style={isActive(history, "/")} to="/">HOME</Link>
           </li>
           <li className="nav-item">
               <Link className ="nav-link" style={isActive(history, "/users")} to="/users">Users</Link>
           </li>
           {!isAuthenticated() && (
               <>
                   <li className="nav-item">
                       <Link className ="nav-link" style={isActive(history, "/login")}  to="/login">LOGIN</Link>
                   </li>
                   <li className="nav-item">
                       <Link className ="nav-link" style={isActive(history, "/register")} to="/register">REGISTER</Link>   
                   </li>
               </>
           )}
           {/* {JSON.stringify(props.history)} */}


           {/* ADMIN LINK TO MAKE VISIBLE TO THE ADMIN ONLY */}
           {isAuthenticated() && isAuthenticated().user.role === "admin" && (
               <li className="nav-item">
                   <Link
                       to={`/admin`}
                       style={isActive(history, `/admin`)}
                       className="nav-link"
                   >
                       Admin
                   </Link>
               </li>
           )}

           {/* if user is authenticated and has valid token only logout is shown */}
          {isAuthenticated() && (
           // <>  represents react.fragments => represents div
           <>
               <li className="nav-item">
                   <Link
                       className ="nav-link"
                           onClick ={() => signout(()=>{history.push('/')})} //pushes history to home
                           >
                           LOGOUT
                   </Link>   
               </li>


               <li className="nav-item">
                   <Link
                       style={isActive(history, `/findpeople`)}
                       className ="nav-link"
                       to={`/findpeople`}
                      >
                          Find People
                   </Link>   
               </li>

               <li className="nav-item">
                   <Link
                       style={isActive(history, `/post/create`)}
                       className ="nav-link"
                       to={`/post/create`}
                      >
                          NEW POST
                   </Link>   
               </li>

               {/* displaying logged in user name */}
               <li className="nav-item">
                   <Link
                       style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                       className ="nav-link"
                       to={`/user/${isAuthenticated().user._id}`}
                      >
                          {`${isAuthenticated().user.name}'s Profile`}
                   </Link>   
               </li>
           </>

          )}
       </ul>
   </div>
);

//react-router-dom gives us higher order component called {withRouter}
//so when we use it -> it gives us history object
//we check current pathname using (history.location.pathname)
//pathname in url if matches one of the url from Link

//giving a component to higher order component (withRouter)=> takes another component as argument
//on doing this we get access to props
//with props we get access to history object
export default withRouter(NavBar);