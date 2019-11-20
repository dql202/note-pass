import React from 'react'
import "./Draft.css"
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import {Editor, EditorState,RichUtils} from 'draft-js';



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
}

export default Take