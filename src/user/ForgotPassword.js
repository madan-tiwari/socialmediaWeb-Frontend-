// When a user forget his/her password. They will click a link (we will add a button called Forgot Password in signin page)

// Upon clicking on the button, they will be taken to ForgotPassword component.

// There, user will enter their email address and submit the form. If that user email exists in our database, then we will email the token in their email address.

// This component has a form where user will enter their email, requesting password reset link. We grab that email, set the state and make request to backend. If the email is not valid or other similar error, we push them to1

import React, { Component } from "react";
import { forgotPassword } from "../auth";
 
class ForgotPassword extends Component {
    state = {
        email: "",
        message: "",
        error: ""
    };
 
    forgotPassword = e => {
        e.preventDefault();
        this.setState({ message: "", error: "" });
        forgotPassword(this.state.email).then(data => {
            if (data.error) {
                console.log(data.error);
                this.setState({ error: data.error });
            } else {
                console.log(data.message);
                this.setState({ message: data.message });
            }
        });
    };
 
    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Ask for Password Reset</h2>
 
                {this.state.message && (
                    <h4 className= "alert alert-success">{this.state.message}</h4>
                )}
                {this.state.error && (
                    <h4 className= "alert alert-danger">{this.state.error}</h4>
                )}
 
                <form>
                    <div className="form-group mt-5">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Your email address"
                            value={this.state.email}
                            name="email"
                            onChange={e =>
                                this.setState({
                                    email: e.target.value,
                                    message: "",
                                    error: ""
                                })
                            }
                            autoFocus
                        />
                    </div>
                    <button
                        onClick={this.forgotPassword}
                        className="btn btn-raised btn-primary"
                    >
                        Send Password Rest Link
                    </button>
                </form>
            </div>
        );
    }
}
 
export default ForgotPassword;