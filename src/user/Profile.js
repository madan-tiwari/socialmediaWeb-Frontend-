import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import DefaultAvatar from '../images/default_avatar.png';
import DeleteUser from "./DeleteUser"
import FollowButton from "../followUnfollowComponent/FollowButton"
import ProfileTabs from "../followUnfollowComponent/ProfileTab"
import {postsByUser} from '../post/postAPI'

//is authenticated method checks if the user is authenticated (checks the token in local storage)
//we can conditionally show and hide links based on this helper method
export const isAuthenticated =() =>{
    if(typeof window == "undefined"){
        return false;
    }

    if(localStorage.getItem("JWT")){
        //parse the token (as it contains user information)
        return JSON.parse(localStorage.getItem("JWT"))
    }else{
        return false;
    }
}

class Profile extends Component {
    // state
    constructor(){
        super()
        this.state ={
            user: {following: [], followers: []},
            redirectToSignin:false,
            following: false, 
            error:"",
            posts:[]
        }
    }

    //takes userId from the init
    read = (userId, token)=>{
        return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
            method:"GET",
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

    //for conditional rendering of the follow/ unfollow buttons
    //checks users followers list -> takes user as arguement returns true/false
    checkFollow = user =>{
        const jwt = isAuthenticated()

        //if the signed in user's id is found then it means the user is already in the followers list
        const match = user.followers.find(follower =>{
            return follower._id === jwt.user._id
        })
        return match
    }

    //onclick event
    //takes function callAi as arguement that makes request to the api
    //we send this method to child component
    clickFollow = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        callApi(userId, token, this.state.user._id)
        .then(data =>{
            if(data.error){
                this.setState({error: data.error})
            }else{
                //populating following as not state (if follow is clicked then unfollow and viceversa)
                this.setState({user: data, following: !this.state.following})  //whatever it was done, we need to alter the value
            }
        })
    }


    //it takes arguement from the componentDidMount (userId)
    init = (userId)=>{
        const token = isAuthenticated().token;
        this.read(userId, token)
        .then(data =>{
            if(data.error){
                this.setState({redirectToSignin: true})
                console.log("ERROR")
            }
            else{
                // console.log(data)
                let following = this.checkFollow(data)
                this.setState({user: data, following}) 
                //to pass the userID to postsByUser()
                this.loadPosts(data._id)
            }
        })
    }


    //postsByUser (userId , token)-> runs when loadPosts run with init which is run when the component mounts
    loadPosts = userId => {
        const token = isAuthenticated().token;
        postsByUser(userId, token)
        .then(data =>{
            if(data.error){console.log(data.error)}
            else{this.setState({posts:data})}
        })
        
    }
    

    //lifecycle method -> when the component is mounted and be ready
    //then we get the user id
    componentDidMount(){
        // console.log("Userrouter from route params:", this.props.match.params.userId);
        const userId = this.props.match.params.userId
        //giving userId to init method to process
        this.init(userId)
    }

    //when the userid in the url changes this method gets invoked 
    //and executes init method but with different userId
    componentWillReceiveProps(props){
        const userId = props.match.params.userId
        //giving userId to init method to process
        this.init(userId)
    }

    render() {
        const redirectToSignin = this.state.redirectToSignin
        if(redirectToSignin) return <Redirect to="/login"/>

         //this URL gives us image
         const photoUrl = this.state.user._id ? 
         `${process.env.REACT_APP_API_URL}/user/photo/${this.state.user._id}?${new Date().getTime()}` :   //new Date().getTime() => gives us the newly updated image
          DefaultAvatar

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">PROFILE PAGE</h2>

                <div className="row">
                    <div className="col-md-4">
                        <img style = {{height: "200px", width: "auto"}} className="img-thumbnail" src={photoUrl} onError={i => (i.target.src=`${DefaultAvatar}`)} alt={this.state.user.name}/>

                        {/* <img className="card-img-top" style ={{width: "100%", height: "15vw", objectFit:"cover"}} src={DefaultAvatar} alt={this.state.user.name}/> */}
                    </div>
                    <div className="col-md-8">
                        <div className="lead mt-2">
                            <p>Hello! {this.state.user.name}</p>
                            <p>Email: {this.state.user.email}</p>
                            <p> {`Joined on ${new Date(this.state.user.created).toDateString()}`}</p>
                        </div>
                        {/* check for authenticated user wether it matches the current userId in the state */}
                        {/* {console.log("USER", isAuthenticated().user)}
                        {console.log("UserID",isAuthenticated().user._id)}
                        {console.log("StateUserID",this.state.user._id )} */}
                        {isAuthenticated().user && isAuthenticated().user._id === this.state.user._id ? (
                            <div className="d-inline-block">
                                <Link className="btn btn-raised btn-info mr-5"
                                to={`/post/create`}
                                >
                                        CREATE POST
                                </Link>
                                <Link className="btn btn-raised btn-success mr-5"
                                to={`/user/edit/${this.state.user._id}`}
                                >
                                        Edit Profile
                                </Link>
                                <DeleteUser userId = {this.state.user._id} /> {/* using DeleteUser Component and passing userId as props*/}
                            </div>
                        ) : (<FollowButton following={this.state.following} onButtonClick={this.clickFollow}/>)}

                        {/* SuperAdmin Update/Delete */}
                        <div>
                            {isAuthenticated().user &&
                                isAuthenticated().user.role === "admin" && (
                                    <div class="card mt-5">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                SUPER ADMIN
                                            </h5>
                                            <p className="mb-2 text-danger">
                                                UPDATE/DELETE as SuperAdmin
                                            </p>
                                            <Link
                                                className="btn btn-raised btn-info mr-5"
                                                to={`/user/edit/${this.state.user._id}`}
                                            >
                                                Edit Profile
                                            </Link>
                                            <DeleteUser userId={this.state.user._id} />
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                       
                </div>
                <div className="row">
                        <div className="col md-12 mt-5 mb-5">
                            <hr/>
                            <p className="lead">{this.state.user.about}</p>
                            <hr/>
                            <ProfileTabs 
                                followers={this.state.user.followers} 
                                following={this.state.user.following}
                                posts={this.state.posts}
                            />
                        </div>
                </div>
            </div>
        );
    }
}

export default Profile;