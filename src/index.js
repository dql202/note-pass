import MyAppTest1 from './MyAppTest1';
import MyAppTest2 from './MyAppTest2';


import React from 'react';
import ReactDOM from 'react-dom';
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";
//import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'


// Components
import './index.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import ProfData from './components/Profile'
import Manage from './components/Manage'
import Take from './components/Take'
import Upload from './components/upload/Upload'
import Login from './components/Login';
import Test from './components/Test';
import Search from './components/Search';
import Logout from './components/Logout';

import AuthRoute from './AuthRoute';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

// Initially, no user is logged in
ReactDOM.render((
    <Router>
        <div>
            <NavBar />
            <Route path="/pdftest" component={MyAppTest2} />
            <Route exact path="/" component={Login} />
            <Route path="/profile" component={ProfData} />
            <Route path="/manage" component={Manage} />
            <Route path="/take" component={Take} />
            <Route path="/upload" component={Upload} />
            <Route path="/test" component={Test} />
            <Route path="/homepage" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/logout" component={Logout} />
        </div>
    </Router>    
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();