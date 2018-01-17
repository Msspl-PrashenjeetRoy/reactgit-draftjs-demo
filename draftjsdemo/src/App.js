import React from 'react';
import Api from './api';
import {
  Editor, 
  EditorState, 
  RichUtils,
  convertToRaw,
  convertFromHTML,
  ContentState,  
  convertFromRaw,
  createFromBlockArray   
} from 'draft-js';

import {stateToHTML} from 'draft-js-export-html';

class App extends React.Component {
  constructor(props) {
    super(props);

    //STATE
    // this.state = {
    //   editorState: EditorState.createEmpty(),
    // };

    // html to raw
    /*const sampleMarkup =
            '<b>Bold dftext</b>, <i>Italic text</i><br/ ><br />' +
            '<a href="http://www.facebook.com">Example link</a><br /><br/ >' +
            '<img src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png" />';

    const blocksFromHTML = convertFromHTML(sampleMarkup);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    ); */

    // raw to html
    // const sampleMarkup =
    /*        '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"href":"http://www.facebook.com","url":"http://www.facebook.com/"}},"1":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"}}},"blocks":[{"key":"3romi","text":"Bold dftext, Italic text\n","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":11,"style":"BOLD"},{"offset":13,"length":11,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"dehmt","text":"Example link\n","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":12,"key":0}],"data":{}},{"key":"686dm","text":"?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":1}],"data":{}}]}';

    const blocksFromHTML = convertFromRaw(sampleMarkup);

    console.log(blocksFromHTML);

    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );*/

    var data = '{"entityMap":{},"blocks":[{"key":"1f6nl","text":"asdfasf asdf asf a","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":18,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"qcmu","text":"asdf asf asdf asdf asdf","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":23,"style":"BOLD"},{"offset":0,"length":23,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"4nvs8","text":"asFsafsdaf asdfasd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":18,"style":"BOLD"},{"offset":0,"length":18,"style":"ITALIC"},{"offset":0,"length":18,"style":"STRIKETHROUGH"}],"entityRanges":[],"data":{}},{"key":"4qjpq","text":"asfas dfasdf asdfa sd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":21,"style":"BOLD"},{"offset":0,"length":21,"style":"ITALIC"},{"offset":0,"length":21,"style":"STRIKETHROUGH"},{"offset":0,"length":21,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"for8h","text":"as fasdf sadf sadf sad","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":22,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"ddlvp","text":"a sdfas dfasd","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":13,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"ck6d3","text":"ffvdafg dgs d","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":13,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"fcdj9","text":"sfdgsd gsdfg sfdg ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":18,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"d69ou","text":"sdfg dfsgsd gfds ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":17,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"5jqdu","text":" agas gasdg sa g","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":16,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"5lrij","text":"af sf asdf asd","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":14,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"ecm9","text":"sdfgdsfg sdfgsdf","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":16,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"93n8u","text":"dg sadgdfsg dsf","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":15,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"2c7uo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'

    var json = JSON.parse(data);

    console.log('json');
    console.log(json);

    var blockArray = convertFromRaw(json);

    console.log('blockArray');
    console.log(blockArray);
    // convertFromRaw(rawState: RawDraftContentState): ContentState

    // var contentState = convertFromRaw(blockArray);

    // console.log('contentState');
    // console.log(contentState);


    // var editorState = EditorState.createWithContent(blockArray);

    // console.log(editorState);


    

    this.state = {

      //loaded editor with database data or static data
      editorState: EditorState.createWithContent(blockArray),
      // editorState: EditorState.createEmpty(),//for empty editor
      welcomeTxt: 'Hi welcome to react!',
      textValue:'',
      error: null,
      isLoaded: false,
      // user_id     : "",
      // passkey     : "",
      // device_uid  : "",
      // timezone    : "",
      // data        : [],

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

      htmlView: ''

    };  

    //ON CHANGE OF EDITOR - ITS UPDATING STATE
    this.onChange = (editorState) => {
      this.setState({editorState})
    };

    this.handleKeyCommand = this.handleKeyCommand.bind(this);

    this.logState = () => console.log(this.state.editorState.toJS());

    //ON SAVE STRING/JSON SAVE
    this.onSave = () => {
      var content = this.state.editorState.getCurrentContent();
      // var raw = convertToRaw(content);//whole extra things
      var raw = JSON.stringify(convertToRaw(content)); //sending to db (json to string converted)

      // console.log(content);

      let html = stateToHTML(content);

      // console.log(html);
      // var tempDiv = document.createElement('p');
      

      // var xmlString = html
      // var parser = new DOMParser();
      // var doc = parser.parseFromString(html, "text/html");
      
      console.log(html);

      this.setState({
        htmlView: html
      })
      // $.post('/api/comment', {comment: raw}, () => {
      //   alert('Saved');
      // });
    };

    
  }

  postCommentFun = () => {
    let self = this;
    // let url  = 'partners/platformList.json';
    // let data_post = {
    //   user_id     : "1120",
    //   passkey     : "NDM2XzIwMTctMDgtMDEgMDU6NDM6MzhfMQ==",
    //   device_uid  : "12345678",
    //   timezone    : "Asia/Kolkata",
    // };

    var content = self.state.editorState.getCurrentContent();
    var raw = convertToRaw(content);//whole extra things
    // var raw = JSON.stringify(convertToRaw(content)); //sending to db (json to string converted)

    // console.log(raw);



    // console.log(row)

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


    // console.log(self.state.comment_content);
    // return false;
  //   "user_id":"1114",
  // "device_uid": "12345678",
  // "passkey": "NDM2XzIwMTctMDgtMDEgMDU6NDM6MzhfMQ==",
  // "platform_id": "1",
  // "timezone": "Asia/Kolkata",
  // "main_post_id":"16028",
  // "parent_post_id":"16046",
  // "main_comment_id":"16046",
  // "comment_content":"this is reply 3-2"


    // console.log(url);
    // console.log(data_post);
    // return false;

   //  let pushedcontent = [];
   // pushedcontent.push('a');
   // console.log(pushedcontent);
   // // pushedcontent = self.state.comment_content[pushedcontent];
   // console.log(self.state.comment_content[pushedcontent]);

   //  self.setState({
   //    comment_content: pushedcontent
   //  });

    // console.log(self.state.comment_content);

   // return false;


    Api.postApi(url, data_post, function(response, error) {
      // console.log(response);
      // console.log(data_post);

      if (error !== '') {
        // self.setState({
        //   error_api              : true,
        //   isRefreshing           : false,
        //   animating              : false,
        //   topLoaderVisibility    : false,
        //   bottomLoaderVisibility : false,
        // });

      } else {
        if (response && response.status.error_status === 'false' && response.status.action_status === 'true') {
          if (response.dataset) {
            console.log(response.dataset)

            
            // self.setState({
            //   comment_content: raw
            // });
            // console.log(self.state.comment_content)

            // console.log(data_post);

            
          } else {
            // self.setState({
            //   error_api              : false,
            //   isRefreshing           : false,
            //   animating              : false,
            //   topLoaderVisibility    : false,
            //   bottomLoaderVisibility : false,
            // });
          }

        } else {
          // self.setState({
          //   error_api              : true,
          //   isRefreshing           : false,
          //   animating              : false,
          //   topLoaderVisibility    : false,
          //   bottomLoaderVisibility : false,
          // });
        }
      }
    });
  }

  onButtonClick = () => {
     this.postCommentFun();
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
        // self.setState({
        //   error_api              : true,
        //   isRefreshing           : false,
        //   animating              : false,
        //   topLoaderVisibility    : false,
        //   bottomLoaderVisibility : false,
        // });

      } else {
        if (response && response.status.error_status === 'false' && response.status.action_status === 'true') {
          if (response.dataset) {
            console.log(response.dataset);


            // return false;
            // self.setState({
            //   get_content: response.dataset.comments[1].comment_content
            // });
            // console.log(self.state.get_content)

            // console.log(data_post);

            
          } else {
            // self.setState({
            //   error_api              : false,
            //   isRefreshing           : false,
            //   animating              : false,
            //   topLoaderVisibility    : false,
            //   bottomLoaderVisibility : false,
            // });
          }

        } else {
          // self.setState({
          //   error_api              : true,
          //   isRefreshing           : false,
          //   animating              : false,
          //   topLoaderVisibility    : false,
          //   bottomLoaderVisibility : false,
          // });
        }
      }
    });
  }


  onFetchComment = () => {
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
    const { editorState } = this.state;
    return (
      <div>

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
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />

        <input
          onClick={this.logState}
          type="button"
          value="Log State"
        />

        <button onClick={this.onSave}>Save</button>

        <button onClick={this.onButtonClick}>onButtonClick</button>

        <button onClick={this.onFetchComment}>onFetchComment</button>



        <h2>View of the output</h2>
        <div>{this.state.htmlView}</div>
      </div>
    );
  }
};



export default App;
