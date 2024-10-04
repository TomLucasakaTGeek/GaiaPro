import React from 'react';
import QueryComponent from './components/querycomp';
import DropzoneComponent from './components/dragndrop';

const App = () => {
  return (
    <div className='App'>
      <h1>Drag and Drop File Upload</h1>
      <DropzoneComponent/>
    </div>
  );
};

export default App;
