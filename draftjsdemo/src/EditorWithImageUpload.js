/*
  - uploading image to editor
  - image from filereader
  - base64 converted
*/
import React from 'react';
import {
  Editor, 
  EditorState, 
  RichUtils,
  AtomicBlockUtils,
} from 'draft-js';

//converting state to html
import {stateToHTML} from 'draft-js-export-html';
import editorStyles from "./index.css";
const url = require('./media.png');


//Not using now: (initial state for static upload all the content and image with it)
const initialState = {
  entityMap: {
    "0": {
      type: "image",
      mutability: "IMMUTABLE",
      data: {
        src:
          "https://www.draft-js-plugins.com/images/canada-landscape-small.jpg"
      }
    }
  },
  blocks: [
    {
      key: "9gm3s",
      text:
        "You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "ov7r",
      text: " ",
      type: "atomic",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0
        }
      ],
      data: {}
    }
  ]
};


//it's used for styling image customBlock
const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: '\'Georgia\', serif',
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  media: {
    width: '100%',
    // Fix an issue with Firefox rendering video controls
    // with 'pre-wrap' white-space
    whiteSpace: 'initial'
  },
};

//if the block type is atomic it render component with editable property
function mediaBlockRenderer(block){
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}

//autio structure
const Audio = (props) => {
    return <audio controls src={props.src} style={styles.media} />;
  };

//Image structure
const Image = (props) => {
  return <img src={props.src} style={styles.media} />;
};


//Video structure
const Video = (props) => {
  return <video controls src={props.src} style={styles.media} />;
};

//the component for media
const Media = (props) => {

  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );
  const {src} = entity.getData();
  const type = entity.getType();

  let media;
  if (type === 'audio') {
    media = <Audio src={src} />;
  } else if (type === 'image') {
    media = <Image src={src} />;
  } else if (type === 'video') {
    media = <Video src={src} />;
  }

  return media;
};   

//main app class
export default class EditorWithImageUpload extends React.Component {
  constructor(props) {
    super(props);


    // STATE
    this.state = {
      editorState: EditorState.createEmpty(),
      // editorState: EditorState.createWithContent(convertFromRaw(initialState)),
      urlValue: '',
      urlType:''
    }; 

    //ON CHANGE OF EDITOR - ITS UPDATING STATE
    this.onChange = (editorState) => {
      this.setState({editorState})
    };

    this.focus = () => this.refs.editor.focus();

    //draft's handlekeycommand function
    this.handleKeyCommand = this.handleKeyCommand.bind(this);

    //loging editor state as json with toJS
    this.logState = () => console.log(this.state.editorState.toJS());
    
    this._confirmMedia =  this._confirmMedia.bind(this);
  }

  //ON SAVE STRING/JSON SAVE
  onSave = () => {
    var content = this.state.editorState.getCurrentContent();
    // var raw = JSON.stringify(convertToRaw(content)); //sending to db (json to string converted)
    console.log(content.getEntityMap())
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


  addImage = (evt) => {
    evt.preventDefault();
    let self = this;

    var file = evt.target.files[0];
    var urlfrom = evt.target.value;
    // console.log('urlfrom');
    // console.log(urlfrom);
    // console.log(file);
    // console.log('==file.type==');
    // console.log(file.type);

    // console.log('==url==');
    // console.log(urlfrom);
     
     var reader = new FileReader();
     // console.log(reader);
    reader.readAsDataURL(file);

    reader.onload = function (e) {
      // console.log(e.target.result);
      self.setState({
        urlValue: e.target.result,
      },()=>{
        // console.log('hello')
        self._confirmMedia();
      })
        
     };
  }


  _confirmMedia(e){
        let self = this;
        const {editorState, urlValue, urlType} = self.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          'image',//urlType
          'IMMUTABLE',//available options- MUTABLE
          {src: urlValue} //url source
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
          editorState,
          {currentContent: contentStateWithEntity}
        );

        self.setState({
          editorState: AtomicBlockUtils.insertAtomicBlock(
            newEditorState,
            entityKey,
            ' '
          ),
          showURLInput: false,
          urlValue: '',
        }, () => {
          setTimeout(() => self.focus(), 0);
        });
  }
  
  render() {
    return (
      <div>
        <h1>EditorWithImageUpload</h1>
        
        <input type="file" multiple onChange={(evt)=> this.addImage(evt)}/>

       {/* <button onClick={(evt)=> this.addImage(evt)}>Upload Image from Local machine</button>*/}

        <div className={editorStyles.editor} onClick={this.focus}>
          <Editor
              blockRendererFn={mediaBlockRenderer}
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              placeholder="Enter some text..."
              ref="editor"
            />
        </div>

        <button onClick={this.logState}>Log State</button> 

        <button onClick={this.onSave}>Save (see console)</button>

        
      </div>
    );
  }
};

