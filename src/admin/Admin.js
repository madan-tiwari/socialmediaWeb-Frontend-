import React, { Component } from "react";
import Posts from "../post/Posts";
import Users from "../user/Users";

// making sure only admin user can land on this page. => natra URL ma /admin garda jaana paauchha
import {isAuthenticated} from '../auth';
import {Redirect} from 'react-router-dom';
 
class Admin extends Component {

    state ={
        redirectToHome: false
    }

    componentDidMount() {
        if (isAuthenticated().user.role !== "admin") {
            this.setState({ redirectToHome: true });
        }
    }

    render() {

        if (this.state.redirectToHome) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <div className="jumbotron">
                    <h2>Admin Dashboard</h2>
                    <p className="lead">WELCOME</p>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <Posts/>
                        </div>
                        <div className="col-md-6">
                            <Users />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Admin;
