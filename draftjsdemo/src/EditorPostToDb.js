import React from 'react';
import Api from './api';
import {
  Editor, 
  EditorState, 
  RichUtils,
  convertToRaw, 
  convertFromRaw,
} from 'draft-js';

//converting state to html
import {stateToHTML} from 'draft-js-export-html';

//main app class
export default class EditorPostToDb extends React.Component {
  constructor(props) {
    super(props);

    var data = '{"entityMap":{},"blocks":[{"key":"1f6nl","text":"asdfasf asdf asf a","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":18,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"qcmu","text":"asdf asf asdf asdf asdf","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":23,"style":"BOLD"},{"offset":0,"length":23,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"4nvs8","text":"asFsafsdaf asdfasd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":18,"style":"BOLD"},{"offset":0,"length":18,"style":"ITALIC"},{"offset":0,"length":18,"style":"STRIKETHROUGH"}],"entityRanges":[],"data":{}},{"key":"4qjpq","text":"asfas dfasdf asdfa sd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":21,"style":"BOLD"},{"offset":0,"length":21,"style":"ITALIC"},{"offset":0,"length":21,"style":"STRIKETHROUGH"},{"offset":0,"length":21,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"for8h","text":"as fasdf sadf sadf sad","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":22,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"ddlvp","text":"a sdfas dfasd","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":13,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"ck6d3","text":"ffvdafg dgs d","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":13,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"fcdj9","text":"sfdgsd gsdfg sfdg ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":18,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"d69ou","text":"sdfg dfsgsd gfds ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":17,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"5jqdu","text":" agas gasdg sa g","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":16,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"5lrij","text":"af sf asdf asd","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":14,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"ecm9","text":"sdfgdsfg sdfgsdf","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":16,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"93n8u","text":"dg sadgdfsg dsf","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":15,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"2c7uo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'

    var json = JSON.parse(data);

    var blockArray = convertFromRaw(json);

    this.state = {

      //loaded editor with database data or static data
      editorState: EditorState.createWithContent(blockArray),

      //
      user_id:'',
      device_uid: '',
      passkey: '',
      platform_id: '',
      timezone: '',
      // main_post_id:'',
      parent_post_id:'',
      main_comment_id:'',
      comment_content:[],
      get_content:'',
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

  postToDbFun = () => {
    let self = this;

    var content = self.state.editorState.getCurrentContent();
    var raw = convertToRaw(content);//whole extra things
    // var raw = JSON.stringify(convertToRaw(content)); //sending to db (json to string converted)

    let url = 'posts/postCommentReply.json';
    let data_post = {
      user_id:'1114',
      device_uid: '12345678',
      passkey: 'NDM2XzIwMTctMDgtMDEgMDU6NDM6MzhfMQ==',
      platform_id: '1',
      timezone: 'Asia/Kolkata',
      main_post_id:'18261',
      comment_content:raw
    };


    Api.postApi(url, data_post, function(response, error) {
      // console.log(response);
      // console.log(data_post);

      if (error !== '') {

      } else {
        if (response && response.status.error_status === 'false' && response.status.action_status === 'true') {
          if (response.dataset) {
            console.log(response.dataset)
            
          } else {
            
          }

        } else {
          
        }
      }
    });
  }

  handleOnButtonClick = () => {
     this.postToDbFun();
  }


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

        <h1>EditorPostToDb</h1>
        {/*Text Styling*/}
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <button onClick={this._onItalicClick.bind(this)}>Italic</button>
        <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>

        {/*main editor*/}
        {/*<Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />*/}

        <Editor
          editorState={this.state.editorState}
          // handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          // customStyleMap={styleMap}
          // stripPastedStyles={true}
          placeholder="hi"
          // textAlignment='right'
        />

        <button onClick={this.logState}>Log State</button> 
        <button onClick={this.onSave}>Save</button>
        <button onClick={this.handleOnButtonClick}>Post to db</button>

      </div>
    );
  }
};

