import React from 'react';
import Api from './api';
import {
  Editor, 
  EditorState, 
  RichUtils, 
} from 'draft-js';

export default class EditorGetFetchDb extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      editorState: EditorState.createEmpty(),
      responseString:'',
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
      description: [
        {htmlopen:null}
      ],

    };  

    //ON CHANGE OF EDITOR - ITS UPDATING STATE
    this.onChange = (editorState) => {
      this.setState({editorState})
    };

    this.handleKeyCommand = this.handleKeyCommand.bind(this);

    this.logState = () => console.log(this.state.editorState.toJS());

  }


  fetchCommentFun = () => {
    let self = this;

    let url = 'posts/getComment.json';
    let data_post = {
      user_id:'1114',
      device_uid: '12345678',
      passkey: 'NDM2XzIwMTctMDgtMDEgMDU6NDM6MzhfMQ==',
      platform_id: '1',
      timezone: 'Asia/Kolkata',
      post_id:'18261',
    };

    Api.postApi(url, data_post, function(response, error) {
      // console.log(response);
      // console.log(data_post);

      if (error !== '') {
        

      } else {
        if (response && response.status.error_status === 'false' && response.status.action_status === 'true') {
          if (response.dataset) {
            console.log(response.dataset);
            self.setState({
              responseString:response.dataset
            })
          } else {

          }

        } else {
          
        }
      }
    });
  }


  handleOnFetchComment = () => {
     this.fetchCommentFun();
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
  }_

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
        <h1>EditorGetFetchDb</h1>        

        {/* Text Styling */}
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <button onClick={this._onItalicClick.bind(this)}>Italic</button>
        <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>

        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          placeholder="Click on fetch from db button"
        />

        <button onClick={this.logState}>Log State</button>
        <button onClick={this.handleOnFetchComment}>Fetch from db</button>

        <p>
        <code>{JSON.stringify(this.state.responseString)}</code>
        </p>


      </div>
    );
  }
};