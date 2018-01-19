import React from 'react';

// example modules by pj
// import EditorReadOnlyComp from './EditorReadOnlyComp';
// import EditorEmpty from './EditorEmpty';
// import EditorWithContent from './EditorWithContent';
// import EditorPostToDb from './EditorPostToDb';
// import EditorGetFetchDb from './EditorGetFetchDb';
import EditorWithImageUpload from './EditorWithImageUpload';

//main app class
class App extends React.Component {
  render() {
    return (
      <div>
        <EditorWithImageUpload/>
      </div>
    );
  }
};



export default App;
