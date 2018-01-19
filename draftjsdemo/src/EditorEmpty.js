import React from 'react';
import {
  Editor, 
  EditorState, 
  RichUtils, 
} from 'draft-js';


//main app class
export default class EditorEpmpty extends React.Component {
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


  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }


  render() {
    return (
      <div>
        <h1>EditorEpmpty</h1>
        {/*main editor*/}
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />

        <button onClick={this.logState}>Log State</button> 

      </div>
    );
  }
};

