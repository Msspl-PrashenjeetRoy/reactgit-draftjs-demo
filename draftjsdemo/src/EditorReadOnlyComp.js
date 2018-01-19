import React from 'react';
import {
  Editor, 
  EditorState, 
  convertFromRaw 
} from 'draft-js';


export default class EditorReadOnlyComp extends React.Component {
  constructor(props) {
    super(props);

    var data = '{"entityMap":{},"blocks":[{"key":"1f6nl","text":"asdfasf asdf asf a","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":18,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"qcmu","text":"asdf asf asdf asdf asdf","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":23,"style":"BOLD"},{"offset":0,"length":23,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"4nvs8","text":"asFsafsdaf asdfasd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":18,"style":"BOLD"},{"offset":0,"length":18,"style":"ITALIC"},{"offset":0,"length":18,"style":"STRIKETHROUGH"}],"entityRanges":[],"data":{}},{"key":"4qjpq","text":"asfas dfasdf asdfa sd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":21,"style":"BOLD"},{"offset":0,"length":21,"style":"ITALIC"},{"offset":0,"length":21,"style":"STRIKETHROUGH"},{"offset":0,"length":21,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"for8h","text":"as fasdf sadf sadf sad","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":22,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"ddlvp","text":"a sdfas dfasd","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":13,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"ck6d3","text":"ffvdafg dgs d","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":13,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"fcdj9","text":"sfdgsd gsdfg sfdg ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":18,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"d69ou","text":"sdfg dfsgsd gfds ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":17,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"5jqdu","text":" agas gasdg sa g","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":16,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"5lrij","text":"af sf asdf asd","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":14,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"ecm9","text":"sdfgdsfg sdfgsdf","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":16,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"93n8u","text":"dg sadgdfsg dsf","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":15,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"2c7uo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'

    var json = JSON.parse(data);

    var blockArray = convertFromRaw(json);


    this.state = {

      //loaded editor with database data or static data
      editorState: EditorState.createWithContent(blockArray),

    };  

    //ON CHANGE OF EDITOR - ITS UPDATING STATE
    this.onChange = (editorState) => {
      this.setState({editorState})
    };
    
  }

  render() {
    return (
      <div>
        <h1>EditorReadOnlyComp</h1>
        
        <h2>View of the editor read only mode</h2>

        {/*view article page: read only mode*/}
        <Editor
          editorState={this.state.editorState}
          readOnly
        />
      </div>
    );
  }
};
