import React, { Component } from 'react';
import { list } from './postAPI';
import { Link } from 'react-router-dom';
import DefaultPostImage from '../images/defaultpostimage.jpg';

class Posts extends Component {

    //state to store users
    constructor(){
        super()
        this.state = {
            posts:[],
            page: 1
        }
    }

    // when component mounts execute method that lists users
    componentDidMount(){
        this.loadPosts(this.state.page)
    }

    loadPosts = page => {
        // list method lists all the users from the api
        list(page).then(data =>{
            if(data.error){console.log(data.error)}
            else{this.setState({posts:data})}
        })
    }

    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadPosts(this.state.page + number);
    };
 
    loadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadPosts(this.state.page - number);
    };


    render() {
        const {posts, page} = this.state
        return (
            <div className ="container">
                <h2 className="mt-5 mb-5"> {!posts.length ? "No more posts!" : "RECENT POSTS"} </h2>
                {this.renderPosts(posts)}

                {page > 1 ? (
                    <button
                        className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
                        onClick={() => this.loadLess(1)}
                    >
                        Previous ({this.state.page - 1})
                    </button>
                ) : (
                    ""
                )}
 
                {posts.length ? (
                    <button
                        className="btn btn-raised btn-success mt-5 mb-5"
                        onClick={() => this.loadMore(1)}
                    >
                        Next ({page + 1})
                    </button>
                ) : (
                    ""
                )}
            </div>
        );
    }

    renderPosts = posts => {
       return(
        <div className="row">
            {/* {JSON.stringify(users)} */}
            {/* looping through posts array. map function works only with array */}
            {posts.map((post,i)=> {
                 const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ""  //to unable click the anonymous user posts
                 const posterName = post.postedBy ? post.postedBy.name : "Anonymous"
                return(
                    // (<div key={i}>{user.name}</div>)
                    <div className="card col-md-4"  key={i}>
                    
                        <div className="card-body">
                        <img style = {{height: "200px", width: "100%"}} className="img-thumbnail mb-3" src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} onError={i => (i.target.src=`${DefaultPostImage}`)} alt={post.name}/>
                            <h5 className="card-title">{post.title}</h5>
                            {/* substring to limit the body size for display */}
                            <p className="card-text">{post.body.substring(0, 50)}</p>
                        <br/>
                        <p className="font-italic mark">
                            Posted by: <Link to = {`${posterId}`}>{posterName}</Link>
                            {" "} on {new Date(post.created).toDateString()}
                        </p>
                            <Link to={`/post/${post._id}`} className="btn btn-raised btn -sm btn-primary">Read more...</Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )}
}

export default Posts;