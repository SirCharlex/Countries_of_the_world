import './App.css';
import CountryDetail from './modules/CountryDetail.jsx'
import Countries from './modules/Countries.jsx';
import Activities from './modules/Activities.jsx'
import Home from './modules/home.jsx';
import NavBar from  './modules/NavBar.jsx';
import { Route } from "react-router-dom";
import React from "react";
import { BrowserRouter } from 'react-router-dom';


/* <h1>Countries of World</h1> */
/* <Home/>
<Countries/> */
// <div className="App">
// </div>

function App() {
  return (
      <React.Fragment>
        <BrowserRouter>
          <NavBar/>
          <Route exact path = '/' component={Home}/>
          <Route exact path = '/countries' component= {Countries}/>
          <Route path = '/countries/:idPais' component= {CountryDetail}/>
          <Route exact path = '/activities' component= {Activities}/>
        </BrowserRouter>
      </React.Fragment>
  );
}

export default App;
