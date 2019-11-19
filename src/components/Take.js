import React from 'react'
import { Editor, EditorState } from 'draft-js';
import { Redirect } from 'react-router-dom';

class Take extends React.Component {
    constructor() {
        super();
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }
    onChange = (editorState) => {
        this.setState({ editorState });
    };
    render() {
        if (window.localStorage.getItem("userID") === "null") {
            return <Redirect to='/' />
        }
        return (
            <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
            />
        );
    }
}

export default Take