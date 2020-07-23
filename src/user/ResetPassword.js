// When user inputs his/her email address and asks for password reset. We send them email with the clickable link. That link contains a url along with the token. The url is the domain name of your client side app set in your Node API's .env file by the name of CLIENT_URL followed by /reset-password/token.



// Once the link is clicked by user, our app (frontend) will have to grab the token from the url. It's possible to grab the token from url, thanks to route params provided by react-router-dom.

// So lets go ahead and grab that token from the url, and make a PUT request to the Node API (backend) along with token, and new password. If the token is valid and the user with that token (resetPasswordLink) is found in the database, our backend will update that user's password. Then user will be able to login with his new password.


import React, { Component } from "react";
import { resetPassword } from "../auth";
 
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            message: "",
            error: ""
        };
    }
 
    resetPassword = e => {
        e.preventDefault();
        this.setState({ message: "", error: "" });
 
        resetPassword({
            newPassword: this.state.newPassword,
            resetPasswordLink: this.props.match.params.resetPasswordToken
        }).then(data => {
            if (data.error) {
                console.log(data.error);
                this.setState({ error: data.error });
            } else {
                console.log(data.message);
                this.setState({ message: data.message, newPassword: "" });
            }
        });
    };
 
    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Reset your Password</h2>
 
                {this.state.message && (
                    <h4 className= "alert alert-success">{this.state.message}</h4>
                )}
                {this.state.error && (
                    <h4 className= "alert alert-danger">{this.state.error}</h4>
                )}
 
                <form>
                    <div className="form-group mt-5">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Your new password"
                            value={this.state.newPassword}
                            name="newPassword"
                            onChange={e =>
                                this.setState({
                                    newPassword: e.target.value,
                                    message: "",
                                    error: ""
                                })
                            }
                            autoFocus
                        />
                    </div>
                    <button
                        onClick={this.resetPassword}
                        className="btn btn-raised btn-primary"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        );
    }
}
 
export default ResetPassword;