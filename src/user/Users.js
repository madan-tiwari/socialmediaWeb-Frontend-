import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DefaultAvatar from '../images/default_avatar.png';

class Users extends Component {

    //state to store users
    constructor(){
        super()
        this.state = {
            users:[],
            page:1
        }
    }

    // when component mounts execute method that lists users
    componentDidMount(){
        this.loadUsers(this.state.page)
    }

    loadUsers = page =>{
        // list method lists all the users from the api
        this.list(page).then(data =>{
            if(data.error){console.log(data.error)}
            else{this.setState({users:data})}
        })
    }

    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadUsers(this.state.page + number);
    };
 
    loadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadUsers(this.state.page - number);
    };

//get all the users from api
    list = (page) =>{
        return fetch(`${process.env.REACT_APP_API_URL}/users/?page=${page}`,{
            method:"GET",
        })
        .then(response =>{
            return response.json()
        })
        .catch(err => console.log(err))
    }

    render() {
        const {users, page} = this.state

        return (
            <div className ="container">
                <h2 className="mt-5 mb-5">  {!users.length ? "NO MORE USERS!" : "USERS LIST"} </h2>
                {this.listUsers(users)}
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
 
                {users.length ? (
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

    listUsers = users => (
        <div className="row">
            {/* {JSON.stringify(users)} */}
            {/* looping through users array. map function works only with array */}
            {users.map((user,i)=> (
                // (<div key={i}>{user.name}</div>)
                <div className="card col-md-4"  key={i}>
                    {/* <img className="card-img-top" style ={{width: "100%", height: "15vw", objectFit:"cover"}} src={DefaultAvatar} alt={user.name}/> */}
                    <div className="card-body">
                    <img style = {{height: "200px", width: "100%"}} className="img-thumbnail mb-5" src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} onError={i => (i.target.src=`${DefaultAvatar}`)} alt={user.name}/>
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link to={`/user/${user._id}`} className="btn btn-raised btn -sm btn-primary">VIEW PROFILE</Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Users;