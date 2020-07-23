export const follow = (userId, token, followId)=>{
    console.log(userId);
    console.log(followId);
    return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
        method:"PUT",
        // to make only authenticated user make the request
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // jwt token from the isAuthenticated function
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, followId})
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

export const unfollow = (userId, token, unfollowId)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
        method:"PUT",
        // to make only authenticated user make the request
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // jwt token from the isAuthenticated function
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, unfollowId})
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

