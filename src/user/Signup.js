
// "rcc -> to auto generate basic react component"

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {signup}from '../auth';

class Signup extends Component {

     //state that holds the value of user input
    // when we make request we can pass the value from it
    constructor(){
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            successMessage: false  //variable set to true when user successfully registers
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

    register = event => {
        event.preventDefault() //stop the default behaviour / page reload
        //we need name email password from the state
        const {name, email, password} = this.state
        const user = {
            // name: name,
            // email: email,
            // password: password  OR
            //since the key and value are same
            name, email, password
        };
        // console.log(user);
         signup(user)
         .then(data =>{
             if(data.error) this.setState({error: data.error})
             else this.setState({
                error:"",
                name:"",
                email:"",
                password:"", 
                successMessage: true

             });
         })
    };

    render() {
        return (
            <div className = "container">
                <h2 className="mt-5 mb-5">REGISTER HERE</h2>

                {/* to keep the error div hidden we are writing instyle css
                double {{}}  first set for jsx. second for style
                applying conditional rendering 
                if there is error displays error, if no error it wont be displayed
                tertiary conditional statement */}
                <div className= "alert alert-danger" style={{ display: this.state.error ? "" : "none"}}>
                    {this.state.error}
                </div>
                
                {/* visible when user successfully gets registered (based on the successMessage varaible) */}
                <div className= "alert alert-info" style={{ display: this.state.successMessage ? "" : "none"}}>
                    REGISTRATION SUCCESSFUL!! 
                    <h6><Link to="/login" id="loginhere" name="loginhere">LOGIN HERE</Link></h6>
                </div>



                {/* SIGNUP FORM */}
                <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        {/* 
                            when user inputs we grab the value and put it in the state
                            onChange we execute handleChange method event handler and
                            "value" to sync the state and input => known as CONTROLLED COMPONENTS*/}
                        <input id="fullName" name="fullName" type="text" onChange={this.handleChange("name")}  className="form-control" value={this.state.name} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input id="email" name="email" type="email" onChange={this.handleChange("email")}  className="form-control" value={this.state.email}/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input id="password" type="password" name="password" onChange={this.handleChange("password")}  className="form-control" value={this.state.password} />
                    </div>
                    {/* when button is clicked register function is triggered */}
                    <button onClick={this.register} id="register" className="btn btn-raised btn-primary">SIGN UP</button>
                </form>
            </div>
        );
    }
}

export default Signup;