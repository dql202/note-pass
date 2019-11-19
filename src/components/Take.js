import React from 'react'
import "./Draft.css"
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import {Editor, EditorState,RichUtils} from 'draft-js';
import { Redirect } from 'react-router-dom';



class Take extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: '' } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
      }
    
      handleChange(value) {
        this.setState({ text: value })
      }
    
      render() {
        if (window.localStorage.getItem("userID") === "") {
            return <Redirect to='/' />
        }
        console.log(this.state.text)
        return (
            <div className="textpageWrapper">
                <h1>Take Note of Something...
                </h1>
                <div className="textinfo">
                    <ReactQuill value={this.state.text}
                      onChange={this.handleChange} />
                
                </div>
                
            </div>
          
        )
      }

    // constructor() {
    //     super();
    //     this.state = {
    //       editorState: EditorState.createEmpty(),
    //     };
    //   }
    // onChange = (editorState) => {
    //     this.setState({ editorState });
    //   };  
    // onUnderlineClick = () => {
    //     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    //   }
    // onBoldClick = () => {
    //     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    //   }
    // toggleBulletPoints = () =>{
    //     this.setState({
    //             editorState: RichUtils.toggleBlockType(this.state.editorState,'unordered-list-item')
    //     })
    // }
    // toggleOrderedList = () =>{
    //     this.setState({
    //             editorState: RichUtils.toggleBlockType(this.state.editorState,'ordered-list-item')
    //     })
    // }
    // saveEditor = () =>{
    //     let contentState = this.state.editorState.getCurrentContent()
    // }
    
    // render() {
    //     return (
    //         <div className="pageWrapper">
    //             <button onClick={this.onUnderlineClick}>Underline</button>
    //             <button onClick={this.onBoldClick}>Bold</button>
    //             <button onClick={this.toggleBulletPoints}>Bullet Points</button>
    //             <button onClick={this.toggleOrderedList}>Numbered List</button>
    //             <br></br>
    //             <br></br>
    //             <div className="info">
    //                 <Editor
    //                             editorState={this.state.editorState}
    //                             handleKeyCommand={this.handleKeyCommand}
    //                             onChange={this.onChange}
    //                 />
    //             </div>
                
    //       </div>
    //     );
    //   }


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