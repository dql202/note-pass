import React from 'react';
import {Redirect} from 'react-router-dom';


//Logs users out
class Logout extends React.Component {
    render() {
        window.localStorage.removeItem("userID");
        return (
            <Redirect to="/" />
        )
    }
}

export default Logout;