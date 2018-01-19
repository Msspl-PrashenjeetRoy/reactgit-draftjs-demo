import React from 'react';
import {
  Editor, 
  EditorState, 
  RichUtils,  
} from 'draft-js';

//converting state to html
import {stateToHTML} from 'draft-js-export-html';


//main app class
export default class EditorWithImageUpload extends React.Component {
  constructor(props) {
    super(props);


    // STATE
    this.state = {
      editorState: EditorState.createEmpty(),// for creating empty editor
    }; 

    //ON CHANGE OF EDITOR - ITS UPDATING STATE
    this.onChange = (editorState) => {
      this.setState({editorState})
    };

    //draft's handlekeycommand function
    this.handleKeyCommand = this.handleKeyCommand.bind(this);

    //loging editor state as json with toJS
    this.logState = () => console.log(this.state.editorState.toJS());

    
  }


  //ON SAVE STRING/JSON SAVE
  onSave = () => {
    var content = this.state.editorState.getCurrentContent();
    // var raw = JSON.stringify(convertToRaw(content)); //sending to db (json to string converted)

    let html = stateToHTML(content);

    console.log(html);

    this.setState({
      htmlView: html
    })
  };

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  getBase64 = (file) => {


     var reader = new FileReader();
     // console.log(reader);
     reader.readAsDataURL(file);
     console.log(reader.readAsDataURL(file));
     // reader.onload = function () {
     //   console.log(reader.result);
     // };
     // reader.onerror = function (error) {
     //   console.log('Error: ', error);
     // };
  }

  addImage = (file) => {
    // console.log(file);
    
    if (file.length > 0) {
      this.getBase64(file[0]);
    }
  }


  render() {
    return (
      <div>
        <h1>EditorWithImageUpload</h1>
        <button onClick={this.addImage}>add image</button>

        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          placeholder="Write something..."
        />

        <button onClick={this.logState}>Log State</button> 

        <button onClick={this.onSave}>Save</button>

        


      </div>
    );
  }
};

