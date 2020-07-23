//we have userid from props like in profile
//we get userId when the component mounts

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../user/Profile';

import DefaultAvatar from '../images/default_avatar.png';


class EditProfile extends Component {
    
    constructor(){
        super()
        this.state={
            id: "",
            name:"",
            email:"",
            password:"", //we wont store password in the state
            redirectToProfile: false, 
            error:"",
            loading: false,
            fileSize: 0, 
            about:""
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
    
    //it takes arguement from the componentDidMount (userId)
    init = (userId)=>{
        const token = isAuthenticated().token;
        this.read(userId, token)
        .then(data =>{
            if(data.error){
                this.setState({redirectToProfile: true})
                console.log("ERROR")
            }
            else{
                // console.log(data)
                this.setState({id: data._id, name: data.name, email:data.email,error: "", about:data.about})
            }
        })
    }
    
    
    //lifecycle method -> when the component is mounted and be ready
    //then we get the user id
    componentDidMount(){
        this.userData = new FormData(); //browser api
        // console.log("Userrouter from route params:", this.props.match.params.userId);
        const userId = this.props.match.params.userId
        //giving userId to init method to process
        this.init(userId)
    }

    //checks if the input fields are valid
    isValid = () => {
        const{name, email, password, fileSize} = this.state

        if(fileSize > 100000){  //1 MB
            this.setState({error: "FILE IS TOO LARGE TO UPLOAD"})
            return false
        }
        if(name.length === 0){
            this.setState({error: "PLEASE ENTER YOUR NAME"})
            return false
        }
        //regular expression
        if(!/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(email)){
            this.setState({error: "PLEASE ENTER A VALID EMAIL"})
            return false
        }
        //if the user dont enter the password they are using the same password
        if(password.length >= 1 && password.length <= 5){
            this.setState({error: "PLEASE ENTER PASSWORD WITH MINIMUM 6 CHARACTERS AND A NUMBER"})
            return false
        }
        return true
    }
    

    //creating handle change method
    //higher order function -> returns another function
    // coz we need strings PLUS access to events (we used onChanged)
    handleChange = (name)=> (event) => {
        this.setState({error:""})
        this.setState({loading: false})

        //we need to target the files in the events to grab from the input
        // checks if we have photo in the name(params)
        const value = name === 'photo' ? event.target.files[0] : event.target.value


        //limiting upload filesize
        const fileSize = name === 'photo' ? event.target.files[0].size : 0;

        //we populate the userData
        //if the name is email -> it will have the value of email
        //if the name is photo -> it will have the value of event.target.files[0]
        this.userData.set(name, value)

        //using array syntax it changes over time
        //based on which it is used it takes target value
        //eg takes password when used in password
        this.setState({[name]: value, fileSize});
    }

    update = event => {
        event.preventDefault() //stop the default behaviour / page reload
        //when the server is busy loading the form data and uploading images to keep the user experience
        this.setState({loading: true})

        if(this.isValid()){
             //we need name email password from the state
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

            this.updateProfile(userId, token, this.userData)
            .then(data => {
                    if(data.error) this.setState({error: data.error})
                    //if admin only redirect =>
                    // because when the user profile is updated, we update the local storage and The Navbar's profile info is based on localStorage user info
                    else if (isAuthenticated().user.role === "admin") {
                        this.setState({
                            redirectToProfile: true
                        });
                    } else {
                        // if same user update local storage and redirect
                        this.updateUser(data, ()=>{
                            this.setState({redirectToProfile: true})
                        }) }
                 
            })
        }
       
    };

    //for navigation link to update the updated user from localStorage
    //as we've set the name from the token in localStorage
    updateUser = (user, next)=>{
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('JWT')){
                let auth = JSON.parse(localStorage.getItem('JWT'))
                auth.user = user  //to update the user date
                
                localStorage.setItem('JWT', JSON.stringify(auth))
                next()
            }
        }
    }

   //takes userId from the init
   updateProfile = (userId, token, user)=>{
       console.log("Update User Data", user);
        return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
            method:"PUT",
            // to make only authenticated user make the request
            headers: {
                Accept: "application/json",
                // jwt token from the isAuthenticated function
                Authorization: `Bearer ${token}`
            },
            body: user  //we dont need to stringify as we have to send actual data (ie form data)
        })
        .then(response =>{
            return response.json()
        })
        .catch(err => console.log(err))
    }

    render() {
        if(this.state.redirectToProfile){
            return <Redirect to={`/user/${this.state.id}`}/>
        }

        //this URL gives us image
        const photoUrl = this.state.id ? 
            `${process.env.REACT_APP_API_URL}/user/photo/${this.state.id}?${new Date().getTime()}` :   //new Date().getTime() => gives us the newly updated image
             DefaultAvatar

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">EDIT PROFILE</h2>

                {/* to keep the error div hidden we are writing instyle css
                double {{}}  first set for jsx. second for style
                applying conditional rendering 
                if there is error displays error, if no error it wont be displayed
                tertiary conditional statement */}
                <div className= "alert alert-danger" style={{ display: this.state.error ? "" : "none"}}>
                    {this.state.error}
                </div>

                {this.state.loading ? (
                    <div className="jumbotron text-center">
                        <h2>Processing...</h2>
                     </div>
                ):("")}

                <img style = {{height: "200px", width: "auto"}} className="img-thumbnail" src={photoUrl} onError={i => (i.target.src=`${DefaultAvatar}`)} alt={this.state.name}/>

                 {/* EDITPROFILE FORM */}
                 <form>
                     {/* to send the form data we need browser api -> form data
                     provides a way to easily construct a set of key/value pairs representing form fields and their values
                     that can be sent using the XMLHttpRequest.send() method
                      - uses same format a form would use if the encoding type were set to "multipart/form-data"
                     */}
                    <div className="form-group">
                        <label className="text-muted">AVATAR</label>
                        {/* 
                            when user inputs we grab the value and put it in the state
                            onChange we execute handleChange method event handler and
                            "value" to sync the state and input => known as CONTROLLED COMPONENTS*/}
                        <input type="file" onChange={this.handleChange("photo")}  className="form-control" accept="image/*" />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        {/* 
                            when user inputs we grab the value and put it in the state
                            onChange we execute handleChange method event handler and
                            "value" to sync the state and input => known as CONTROLLED COMPONENTS*/}
                        <input type="text" onChange={this.handleChange("name")}  className="form-control" value={this.state.name} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input  type="email" onChange={this.handleChange("email")}  className="form-control" value={this.state.email}/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input type="password" onChange={this.handleChange("password")}  className="form-control" value={this.state.password} />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">ABOUT</label>
                        {/* 
                            when user inputs we grab the value and put it in the state
                            onChange we execute handleChange method event handler and
                            "value" to sync the state and input => known as CONTROLLED COMPONENTS*/}
                        <textarea type="text" onChange={this.handleChange("about")}  className="form-control" value={this.state.about} />
                    </div>
                    {/* when button is clicked register function is triggered */}
                    <button onClick={this.update} className="btn btn-raised btn-primary">UPDATE</button>
                </form>

            </div>
        );
    }
}

export default EditProfile;