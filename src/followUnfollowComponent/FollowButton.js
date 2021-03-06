import React, { Component } from 'react';
import { follow, unfollow } from '../user/followAPIcall';

class FollowButton extends Component {
    followClick= () =>{
        this.props.onButtonClick(follow)
    }
    unfollowClick= () =>{
        this.props.onButtonClick(unfollow)
    }

    render() {
        return (
            <div className="d-inline-block ">
                {
                    !this.props.following ? (
                        <button onClick={this.followClick} className="btn btn-primary btn-raised mr-5">FOLLOW</button>
                    ) : (
                        <button onClick={this.unfollowClick} className="btn btn-warning btn-raised mr-5">UNFOLLOW</button>
                    )
                }
            </div>
        );
    }
}

export default FollowButton;