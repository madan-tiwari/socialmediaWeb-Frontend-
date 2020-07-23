export const signup = user => {
    // we need to make post request ->we can use axios(http client)
     // we are using fetch (no need to install 3rd party)
     //1st arguement - URL
     return fetch("http://localhost:8080/signup", {
        method: "POST",  //type of request
        headers:{
            Accept: "application/json",  //contenttype application/json 
            "Content-Type": "application/json"
        },
        //like in postman 
        body: JSON.stringify(user) 
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err));
}


export const signin = user => {
    // we need to make post request ->we can use axios(http client)
     // we are using fetch (no need to install 3rd party)
     //1st arguement - URL
     return fetch("http://localhost:8080/signin", {
        method: "POST",  //type of request
        headers:{
            Accept: "application/json",  //contenttype application/json 
            "Content-Type": "application/json"
        },
        //like in postman 
        body: JSON.stringify(user) 
    })
    .then(res =>{
        return res.json()
    })
    .catch(err => console.log(err));
}

 export const validLogin = (jwt, next ) => {
    // we check if window object is available (good practice)
    if(typeof window !== "undefined"){
        //access local storage
        //localstorage has 2 methodsL setItem and getItem
        localStorage.setItem("JWT" , JSON.stringify(jwt))
        next()
    }
}

export const signout = (next)=>{
    //check if token from local storage is deleted
  // call the api to logout
  if(typeof window !== "undefined") localStorage.removeItem("JWT")
      next()
      return fetch("http://localhost:8080/signout", {
          method: "GET"
      })
      .then(response => {
          console.log('signout', response.body.message);
          return response.json()
      })
      .catch(err => console.log(err))
};


//is authenticated method checks if the user is authenticated (checks the token in local storage)
//we can conditionally show and hide links based on this helper method
export const isAuthenticated = () =>{
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

export const authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt));
        next();
    }
};

//METHOD TO MAKE POST REQUEST TO BACKEND
export const socialLogin = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/social-login/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // credentials: "include", // works only in the same origin
        body: JSON.stringify(user)
    })
        .then(response => {
            console.log("signin response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};


export const forgotPassword = email => {
    console.log("email: ", email);
    return fetch(`${process.env.REACT_APP_API_URL}/forgot-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};
 
export const resetPassword = resetInfo => {
    return fetch(`${process.env.REACT_APP_API_URL}/reset-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};