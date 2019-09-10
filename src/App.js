import React from 'react';
import Header from './Header';
import './App.css';
import {Button, ButtonToolbar} from 'react-bootstrap';


/* 
    The buttons on the homepage that allow users to 
    upload notes, take notes, and manage their notes.
*/
class NotePassButtons extends React.Component {
    render() {
        return (
            <div>
                <ButtonToolbar>
                    <Button variant="primary" size="lg">
                        Take Notes
                    </Button>
                    <Button variant="secondary" size="lg">
                        Upload Notes
                    </Button>
                    <Button variant="primary" size="lg">
                        Manage Notes
                    </Button>
                </ButtonToolbar>
            </div>
        );
    }
}

/*
    The driver for the web app. Displays the components
    for the homepage in the correct order.
*/
function App() {
    return (
        <div className="App">
            <Header />
            <NotePassButtons />
        </div>
    );
}

export default App;