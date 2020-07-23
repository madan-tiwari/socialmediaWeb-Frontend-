import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { signout } from '../auth';

class DeleteUser extends Component {

    state = {
        redirect: false
    }


    deleteAccount = () => {
        // console.log("delete account");
        const token = isAuthenticated().token
        const userId = this.props.userId
        this.remove(userId, token)
        .then(data => {
            if(data.error){
                console.log(data.error)}
            else{
                //signout (takes function as an arguement)
                signout(()=>console.log("USER DELETED"))
                //and redirect -> we need state
                this.setState({redirect:true})
            }

        })
    }


    remove = (userId, token)=>{
        return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
            method:"DELETE",
            // to make only authenticated user make the request
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // jwt token from the isAuthenticated function
                Authorization: `Bearer ${token}`
            }
        })
        .then(response =>{
            return response.json()
        })
        .catch(err => console.log(err))
    }

    //asks for user confirmation to delete the account
    //after the response by the user deleteAccount function is called
    deleteConfirm = () =>{
        //we are using alert given by window in default
        let answer = window.confirm("Are you sure you want to delete your account?")
        if(answer){
            this.deleteAccount();
        }
    }

    render() {
        if(this.state.redirect){
            return <Redirect to="/"/>
        }
        return (
            <button onClick={this.deleteConfirm} className="btn btn-raised btn-danger">DELETE ACCOUNT</button>
        );
    }
}

export default DeleteUser;