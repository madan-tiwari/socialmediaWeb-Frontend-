import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DefaultAvatar from '../images/default_avatar.png';


class ProfileTab extends Component {
    render() {

        //accessing props
        const{following, followers, posts} = this.props

        return (
            <div>
               <div className="row">
                    <div className="col-md-4">
                        <h5 className="text-info">FOLLOWERS</h5>
                        <hr/>
                        {/* mapping through each followers */}
                        {followers.map((follower, i) => (
                            <div key = {i}>
                                    <div>
                                        <Link to={`/user/${follower._id}`}>
                                            <img style ={{borderRadius: "50%", border: "1px solid black"}} className="float-left mr-2" height="30px" width="30px" src={`${process.env.REACT_APP_API_URL}/user/photo/${follower._id}`}
                                            alt = {follower.name} onError={i => (i.target.src=`${DefaultAvatar}`)} 
                                            />
                                            <div>
                                                <p className="lead">{follower.name}</p>
                                            </div>
                                        </Link>
                                    </div>
                            </div>
                        ))}
                    </div>  

                    <div className="col-md-4"> 
                     <h5 className="text-info">FOLLOWING</h5>
                        <hr/>
                        {/* mapping through each followers */}
                        {following.map((following, i) => ( 
                             <div key = {i}>
                                    <div>
                                        <Link to={`/user/${following._id}`}>
                                            <img style ={{borderRadius: "50%", border: "1px solid black"}} className="float-left mr-2" height="30px" width="30px" src={`${process.env.REACT_APP_API_URL}/user/photo/${following._id}`}
                                            alt = {following.name} onError={i => (i.target.src=`${DefaultAvatar}`)} 
                                            />
                                            <div>
                                                <p className="lead">{following.name}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                        ))}
                     </div>    

                    <div className="col-md-4"> 
                        <h5 className="text-info">POSTS</h5>
                        <hr/>
                        {/* {JSON.stringify(posts)} */}

                        {posts.map((post, i) => ( 
                            <div key = {i}>
                                <div>
                                    <Link to={`/post/${post._id}`}>
                                        <div>
                                            <p className="lead">{post.title}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>   
                </div>
            </div>
        );
    }
}

export default ProfileTab;