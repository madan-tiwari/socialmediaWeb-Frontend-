import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DefaultAvatar from '../images/default_avatar.png';
import { isAuthenticated } from '../auth';
import { follow } from '../user/followAPIcall';

class FindPeople extends Component {

    //state to store users
    constructor(){
        super()
        this.state = {
            users:[],
            error:"", 
            open:false //when it is true, we show the message
        }
    }

    // when component mounts execute method that lists users
    componentDidMount(){
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        // list method lists all the users from the api
        this.findPeople(userId, token)
            .then(data =>{
                if(data.error){console.log(data.error)}
                else{this.setState({users:data})}
            })
    }

    findPeople = (userId, token)=>{
        return fetch(`http://localhost:8080/user/findpeople/${userId}`, {
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



    //follow button click event -> takes user and index as arguement
    clickFollow = (user, i)=>{
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token

        //follow method from followAPIcall 
        follow(userId, token, user._id) //gives json response -> means the user has already been followed
        .then(data =>{
            if(data.error){this.setState({error:data.error})}
            else{
                //stores users in state which are already followed
                let toFollow = this.state.users
                //splice takes index and 1
                toFollow.splice(i, 1)  //what user we clicked to follow we put them in the array and cut them off
                // when we click the follow button the array of user is one item less
                this.setState(({users:toFollow, open:true, followMessage: `Following ${user.name}`}))
            }
        })

    }

    listUsers = users => (
        <div className="row">
            {/* {JSON.stringify(users)} */}
            {/* looping through users array. map function works only with array */}
            {users.map((user,i)=> (
                // (<div key={i}>{user.name}</div>)
                <div className="card col-md-4"  key={i}>
                    <img style = {{height: "200px", width: "auto"}} className="img-thumbnail" src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} onError={i => (i.target.src=`${DefaultAvatar}`)} alt={user.name}/>
                  
                    {/* <img className="card-img-top" style ={{width: "100%", height: "15vw", objectFit:"cover"}} src={DefaultAvatar} alt={user.name}/> */}
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link to={`/user/${user._id}`} className="btn btn-raised btn -sm btn-primary">VIEW PROFILE</Link>
                        <button onClick={()=>this.clickFollow(user, i)} className="btn btn-raised btn-info float-right btn-sm">Follow</button>
                    </div>
                </div>
            ))}
        </div>
    )



    render() {
        const {users, open, followMessage} = this.state
        return (
            <div className ="container">
                <h2 className="mt-5 mb-5"> People to Follow </h2>
                    {open && (
                         <div className="alert alert-success">
                            {open && (<p>{followMessage}</p>)}
                         </div>
                    )}
                {this.listUsers(users)}
            </div>
        );
    }
}

export default FindPeople;