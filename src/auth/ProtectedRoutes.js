
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticated} from '../user/Profile';


//https://reacttraining.com/react-router/web/example/auth-workflow
// functional component -> to give access to valid users only.
//takes component and 
const ProtectedRoutes = ({ component: Component, ...rest }) => {
   //props means components passed down to the protected route component
    return (
      <Route  //takes rest of the props and render props using arrow function 
        {...rest}
        render={props =>
          isAuthenticated ? (  //check if the user is authenticated
            <Component {...props} />
          ) : (
            <Redirect  //if NOT authenticated redirect them to the login page
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default ProtectedRoutes;