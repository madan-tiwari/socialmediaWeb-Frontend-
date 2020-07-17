export const createPost = (userId, token, post)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
        method:"POST",
        // to make only authenticated user make the request
        headers: {
            Accept: "application/json",
            // jwt token from the isAuthenticated function
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

//get all the users from api
export const list = page =>{
    return fetch(`${process.env.REACT_APP_API_URL}/posts/?page=${page}`,{
        method:"GET",
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

export const singlePost = (postId) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
        method:"GET",
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

//get all posts by a single user
export const postsByUser = (userId, token) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`,{
        method:"GET",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            // jwt token from the isAuthenticated function
            Authorization: `Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

export const remove = (postId, token)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method:"DELETE",
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



//takes userId from the init
export const update = (postId, token, post)=>{
     return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
         method:"PUT",
         // to make only authenticated user make the request
         headers: {
             Accept: "application/json",
             // jwt token from the isAuthenticated function
             Authorization: `Bearer ${token}`
         },
         body: post  //we dont need to stringify as we have to send actual data (ie form data)
     })
     .then(response =>{
         return response.json()
     })
     .catch(err => console.log(err))
 }
