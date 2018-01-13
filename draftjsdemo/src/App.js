import React from 'react';
import {
  Editor, 
  EditorState, 
  RichUtils,
  convertToRaw,
  convertFromHTML,
  ContentState,       
} from 'draft-js';



class App extends React.Component {
  constructor(props) {
    super(props);
    //STATE
    // this.state = {
    //   editorState: EditorState.createEmpty(),
    // };

    const sampleMarkup =
            '<b>Bold dftext</b>, <i>Italic text</i><br/ ><br />' +
            '<a href="http://www.facebook.com">Example link</a><br /><br/ >' +
            '<img src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png" />';
    const blocksFromHTML = convertFromHTML(sampleMarkup);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );

    this.state = {
      editorState: EditorState.createWithContent(
        state
      ),
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

      console.log(raw);
      // $.post('/api/comment', {comment: raw}, () => {
      //   alert('Saved');
      // });
    };

    
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

        {/*Text Styling*/}
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <button onClick={this._onItalicClick.bind(this)}>Italic</button>
        <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>

        {/*main editor*/}
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
      </div>
    );
  }
}


export default App;
