import React from 'react';
import ReactDOM from 'react-dom';
//import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'

// Components
import './index.css';
import Home from './Home';
import NavBar from './NavBar';
import Profile from './Profile'
import Manage from './notes/Manage'
import Take from './notes/Take'
import Upload from './notes/Upload'

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