import React from 'react';
import ReactDOM from 'react-dom';
//import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'

// Components
import './index.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Profile from './components/Profile'
import Manage from './components/Manage'
import Take from './components/Take'
import Upload from './components/Upload'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

ReactDOM.render((
    <Router>
        <div>
            <NavBar />
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/manage" component={Manage} />
            <Route path="/take" component={Take} />
            <Route path="/upload" component={Upload} />
        </div>
    </Router>    
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();