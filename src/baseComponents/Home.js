import React from 'react'
import Posts from "../post/Posts"
const Home = () => (
   
   <div>
        <div className="jumbotron" >
            <h2>HOME</h2>
            <p id="welcome" className="lead">WELCOME</p>
        </div>
        <div className="container">
            <Posts/>
        </div>
   </div>
   
)

export default Home;
