import React from 'react';
import {
  Editor, 
  EditorState, 
  RichUtils,
  convertFromRaw, 
} from 'draft-js';

//converting state to html
import {stateToHTML} from 'draft-js-export-html';


//main app class
export default class EditorWithContent extends React.Component {
  constructor(props) {
    super(props);

    var data = '{"entityMap":{},"blocks":[{"key":"1f6nl","text":"asdfasf asdf asf a","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":18,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"qcmu","text":"asdf asf asdf asdf asdf","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":23,"style":"BOLD"},{"offset":0,"length":23,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"4nvs8","text":"asFsafsdaf asdfasd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":18,"style":"BOLD"},{"offset":0,"length":18,"style":"ITALIC"},{"offset":0,"length":18,"style":"STRIKETHROUGH"}],"entityRanges":[],"data":{}},{"key":"4qjpq","text":"asfas dfasdf asdfa sd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":21,"style":"BOLD"},{"offset":0,"length":21,"style":"ITALIC"},{"offset":0,"length":21,"style":"STRIKETHROUGH"},{"offset":0,"length":21,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"for8h","text":"as fasdf sadf sadf sad","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":22,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"ddlvp","text":"a sdfas dfasd","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":13,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"ck6d3","text":"ffvdafg dgs d","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":13,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"fcdj9","text":"sfdgsd gsdfg sfdg ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":18,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"d69ou","text":"sdfg dfsgsd gfds ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":17,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"5jqdu","text":" agas gasdg sa g","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":16,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"5lrij","text":"af sf asdf asd","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":14,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"ecm9","text":"sdfgdsfg sdfgsdf","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":16,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"93n8u","text":"dg sadgdfsg dsf","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":15,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"2c7uo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'

    var json = JSON.parse(data);
    var blockArray = convertFromRaw(json);

    this.state = {
      //loaded editor with database data or static data
      editorState: EditorState.createWithContent(blockArray),
      htmlView: [],
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

  // TEXT STYLINGS - BOLD ITALIC, UNDERLINE
  // BOLD
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  // ITALIC
  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  // UNDERLINE
  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  render() {
    return (
      <div>
        <h1>EditorWithContent</h1>
        
        {/*Text Styling*/}
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <button onClick={this._onItalicClick.bind(this)}>Italic</button>
        <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>

        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          placeholder="Write something..."
        />

        <button onClick={this.logState}>Log State</button> 

        <button onClick={this.onSave}>Save</button>

        <button onClick={this.onButtonClick}>Post to db</button>

        <button onClick={this.handleOnFetchFun}>Fetch from db</button>



        <h2>View of the html string (it will work when save button click)</h2>
        <div>{this.state.htmlView}</div>
      </div>
    );
  }
};

