//we have userid from props like in profile
//we get userId when the component mounts

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createPost } from './postAPI';
import { isAuthenticated } from '../user/Profile';

// import DefaultAvatar from '../images/default_avatar.png';


class NewPost extends Component {
    
    constructor(){
        super()
        this.state={
            title: "",
            body:"",
            photo:"",
            error:"",
            user: {}, 
            fileSize:0, 
            loading:false,
            redirectToProfile: false
        }
    }
    
    
    //lifecycle method -> when the component is mounted and be ready
    //then we get the user id
    componentDidMount(){
        this.postData = new FormData(); //browser api
        this.setState({user: isAuthenticated().user})
    }

    //checks if the input fields are valid
    isValid = () => {
        const{title, body, fileSize} = this.state

        if(fileSize > 100000){  //1 MB
            this.setState({error: "FILE IS TOO LARGE TO UPLOAD"})
            return false
        }
        if(title.length === 0 ){
            this.setState({error: "PLEASE ENTER THE TITLE"})
            return false
        }

        if(body.length === 0 ){
            this.setState({error: "PLEASE ENTER THE BODY"})
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
        this.postData.set(name, value)

        //using array syntax it changes over time
        //based on which it is used it takes target value
        //eg takes password when used in password
        this.setState({[name]: value, fileSize});
    }

    clickSubmit = event => {
        event.preventDefault() //stop the default behaviour / page reload
        //when the server is busy loading the form data and uploading images to keep the user experience
        this.setState({loading: true})

        if(this.isValid()){
             //we need name email password from the state
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

           createPost(userId, token, this.postData)
            .then(data => {
                    if(data.error) this.setState({error: data.error})
                    else 
                        console.log("NEW POST", data);
                        this.setState({loading:false, title:"", body:"", photo:"", redirectToProfile:true})
                 
            })
        }
       
    };

    render() {
        if(this.state.redirectToProfile){
            return <Redirect to={`/user/${this.state.user._id}`}/>
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">CREATE NEW POST</h2>

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

                 {/* NEWPOST FORM */}
                 <form>
                     {/* to send the form data we need browser api -> form data
                     provides a way to easily construct a set of key/value pairs representing form fields and their values
                     that can be sent using the XMLHttpRequest.send() method
                      - uses same format a form would use if the encoding type were set to "multipart/form-data"
                     */}
                    <div className="form-group">
                        <label className="text-muted">PHOTO</label>
                        {/* 
                            when user inputs we grab the value and put it in the state
                            onChange we execute handleChange method event handler and
                            "value" to sync the state and input => known as CONTROLLED COMPONENTS*/}
                        <input type="file" onChange={this.handleChange("photo")}  className="form-control" accept="image/*" />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">TITLE</label>
                        {/* 
                            when user inputs we grab the value and put it in the state
                            onChange we execute handleChange method event handler and
                            "value" to sync the state and input => known as CONTROLLED COMPONENTS*/}
                        <input type="text" onChange={this.handleChange("title")}  className="form-control" value={this.state.title} />
                    </div>
         
                    <div className="form-group">
                        <label className="text-muted">DESCRIPTION</label>
                        {/* 
                            when user inputs we grab the value and put it in the state
                            onChange we execute handleChange method event handler and
                            "value" to sync the state and input => known as CONTROLLED COMPONENTS*/}
                        <textarea type="text" onChange={this.handleChange("body")}  className="form-control" value={this.state.body} />
                    </div>
                    {/* when button is clicked register function is triggered */}
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">POST</button>
                </form>

            </div>
        );
    }
}

export default NewPost;