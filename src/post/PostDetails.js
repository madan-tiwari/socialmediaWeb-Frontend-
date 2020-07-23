import React, { Component } from 'react';
import {singlePost, remove, like, unlike} from './postAPI'
import { Link, Redirect } from 'react-router-dom';
import DefaultPostImage from '../images/defaultpostimage.jpg';
// import { isAuthenticated } from "../auth";


import Comment from './Comment'


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


class PostDetails extends Component {
    state={
        post:'',
        redirect: false,
        redirectToLogin: false,
        like:false,  //keeps track of the user (wether liked or not)
        likes: 0,  //array
        comments: []
    }

    componentDidMount = () =>{
        // debugger;
        const postId = this.props.match.params.postId
        singlePost(postId).then(data =>{
            if(data.error) {console.log(data.error)}
            else {this.setState({post: data, likes: data.likes.length, like: this.checkLike(data.likes), comments: data.comments})}
        })
    }

    deletePost = () =>{
        const postId = this.props.match.params.postId
        const token = isAuthenticated().token
        remove(postId, token)
        .then(data =>{
            if(data.error) {console.log(data.error)}
            else {this.setState({redirect: true})}
        })
    }

    //get all the commments and repopulate the comments in the state
    updateComments = comments =>{
        this.setState({comments})
    }

     //asks for user confirmation to delete the account
    //after the response by the user deleteAccount function is called
    deleteConfirm = () =>{
        //we are using alert given by window in default
        let answer = window.confirm("Are you sure you want to delete this post?")
        if(answer){
            this.deletePost();
        }
    }

    //check if the currently logged in user is already in the likes array
    checkLike = likes => {
        //for not logged in user to handle error
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1;  //userId in likes array (if not found returns -1)
        return match;
    };

    //makes request to backend to like and unlike 
    likeUnlike =()=>{
        if(!isAuthenticated()){
        //for not logged in user to handle error
            this.setState({redirectToLogin:true}) 
            return false; //rest of the code is not executed
        }
        //if state.like is true we make put request to unlike else we request post/like
        let callApi = this.state.like ? unlike : like
        const userId = isAuthenticated().user._id
        const postId = this.state.post._id
        const token = isAuthenticated().token

        callApi(userId, token, postId)
        .then(data =>{
            if(data.error) {console.log(data.error)}
            else {this.setState({like: !this.state.like, likes: data.likes.length})}
        })

    }

    renderPost = (post) =>{
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ""  //to unable click the anonymous user posts
        const posterName = post.postedBy ? post.postedBy.name : "Anonymous"


        const { like, likes } = this.state;

        return (
                <div className="card-body">
                    <img style = {{height: "300px", width: "100%", objectFit:"cover"}} className="img-thumbnail mb-3" src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} onError={i => (i.target.src=`${DefaultPostImage}`)} alt={post.name}/>
                    
                    {/* like styling */}
                    {like ? (
                        <h5 onClick={this.likeUnlike}>
                            <i className="fa fa-heart text-success bg-light" style={{padding: "10px", borderRadius:"50%"}}></i> 
                            {" "} {likes} likes </h5>
                    ) : (
                        <h5 onClick={this.likeUnlike}> 
                           <i className="fa fa-heart-o text-success bg-light" style={{padding: "10px", borderRadius:"50%"}}></i> 
                            {" "}
                            {likes} likes </h5>
                    )}

                    
                    <p className="card-text" style={{wordBreak: "break-all"}}>{post.body}</p>
                    <br/>
                    <p className="font-italic mark">
                        Posted by: <Link to = {`${posterId}`}>{posterName}</Link>
                        {" "} on {new Date(post.created).toDateString()}
                    </p>
                    <div className="d-inline-block ">
                        <Link to={`/`} className="btn btn-raised btn-sm btn-primary mr-5">VIEW ALL POSTS</Link>
{/*                       
                        {console.log("USER", isAuthenticated().user)}
                        {console.log("UserID",isAuthenticated().user._id)}
                        {console.log("StateUserID",post.postedBy._id )} */}
                        
                        {isAuthenticated().user &&
                        isAuthenticated().user._id === post.postedBy._id && (
                            <> 
                                <Link to={`/post/update/${post._id}`} className="btn btn-raised btn-sm btn-info mr-5">UPDATE</Link>

                                <button onClick={this.deleteConfirm} className="btn btn-raised btn-sm btn-danger">
                                    DELETE
                                </button>
                            </>
                        )} 
                        
                        {/* Update/Delete buttons for SuperAdmin */}
                        <div>
                            {isAuthenticated().user &&
                                isAuthenticated().user.role === "admin" && (
                                    <div class="card mt-5">
                                        <div className="card-body">
                                            <h5 className="card-title">Admin</h5>
                                            <p className="mb-2 text-danger">
                                                Edit/Delete as an Admin
                                            </p>
                                            <Link
                                                to={`/post/update/${post._id}`}
                                                className="btn btn-raised btn-warning btn-sm mr-5"
                                            >
                                                Update Post
                                            </Link>
                                            <button
                                                onClick={this.deleteConfirm}
                                                className="btn btn-raised btn-danger"
                                            >
                                                Delete Post
                                            </button>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
        )
    }



    render() {
        const {post, redirect, redirectToLogin, comments} = this.state

        if(redirect){
            return <Redirect to={`/`}/>
        } else if(redirectToLogin){
            return <Redirect to={`/login`}/>
        }

        return (
            <div className="container">
                <h2 className="display-2 mt-3 mb-5">{post.title}</h2>
                {/* {JSON.stringify(this.state.post)}   */}
                {!post ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    this.renderPost(post)
                )}

                {/* sending props to the comment component so that we can access postId and*/}
                {/* <Comment postId={post._id} comments={comments} updateComments={this.updateComments}/>   */}
                <Comment
                    postId={post._id}
                    comments={comments.reverse()}
                    updateComments={this.updateComments}
                />
            </div>
        );
    }
}

export default PostDetails;