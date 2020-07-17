// "rcc -> to auto generate basic react component"

import { Link, Redirect } from "react-router-dom";

import React, { Component } from 'react';
// import {Redirect} from 'react-router-dom';
import {signin, validLogin} from '../auth';


class Login extends Component {

     //state that holds the value of user input
    // when we make request we can pass the value from it
    constructor(){
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirect: false 
        }
    }


    //creating handle change method
    //higher order function -> returns another function
    // coz we need strings PLUS access to events (we used onChanged)
    handleChange = (name)=> (event) => {
        
        //using array syntax it changes over time
        //based on which it is used it takes target value
        //eg takes password when used in password
        this.setState({[name]: event.target.value});


        //clearing error on change
        this.setState({error: ""})

    }


    //
   

    login = event => {
        event.preventDefault() //stop the default behaviour / page reload
        //we need name email password from the state
        const {email, password} = this.state
        const user = {
            // name: name,
            // email: email,
            // password: password  OR
            //since the key and value are same
            email, password
        };
        // console.log(user);
         signin(user)
         .then(data =>{
             if(data.error)
             {
                 this.setState({error: data.error})
             } 
             else {
                 //FIRST AUTHENTICATE THE USER -> and send JWT to store in browsers local storage
                 validLogin(data, ()=>{
                     this.setState({redirect:true}) //when this is true we redirect
                 })
                 //AND THEN REDIRECT THEM TO DASHBOARD -> WE CREATED REDIRECT FIELD IN THE STATE 
                 //IMPORTED Redirect from react-router-dom
             }
               
         })
    };


    


    render() {
        if(this.state.redirect){return <Redirect to="/"/>}
        return (
            <div className = "container">
                
                {/* LOGIN FORM */}
                <form>
                    {/* 
                        when user inputs we grab the value and put it in the state
                        onChange we execute handleChange method event handler and
                        "value" to sync the state and input => known as CONTROLLED COMPONENTS*/}
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input  type="email" onChange={this.handleChange("email")}  className="form-control" value={this.state.email}/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input type="password" onChange={this.handleChange("password")}  className="form-control" value={this.state.password} />
                    </div>
                    {/* when button is clicked register function is triggered */}
                    <button onClick={this.login} className="btn btn-raised btn-primary">LOGIN</button>
                </form>
                <p>
                    <Link to="/forgot-password" className="text-info">
                        {" "}
                        Forgot Password??
                    </Link>
                </p>
            </div>
        );
    }
}

export default Login;