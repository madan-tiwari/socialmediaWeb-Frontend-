//Wrapper for entire react application (for home, contacts and other pages)
//we created base folder and created component("Home.js") -> Capital start to depict Component
import React from 'react';

//importing BrowserRouter component 
//wraps all the existing routes when we post the different routes from / to home, home to about
//knows which routes to render, which route is in the url, Pathname
import {BrowserRouter} from 'react-router-dom'

//importing Router form Router
import Router from './Router'


// This component is loaded in div with id = "root" in index.html
const App = () => (
    // All the routing happens here
  <BrowserRouter>
  {/* Router from Router.js */}
    <Router/>
  </BrowserRouter>
)

// we dont need this component to be class component
// class App extends Component{
//   render(){
//     return(

//     <div className="container">
//         <h1>HEY THERE FROM REACT FRONT END</h1>
//     </div>
//     )
//   }
// }

export default App;
