import React from 'react'
//import "./Draft.css"
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
        if (window.localStorage.getItem("userID") === "") {
            return <Redirect to='/' />
        }
        return (
            <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
            />
        );
    }
    // constructor(props) {
    //     super(props);
    //     this.state = {editorState: EditorState.createEmpty()};
    //     this.onChange = (editorState) => this.setState({editorState});
    // }
    // render() {
    //     return (
    //         <div>
    //             <h1><center>Take</center></h1>
    //             <Editor editorState={this.state.editorState} onChange={this.onChange} />
    //         </div>
    //     )
    // }
}

export default Take