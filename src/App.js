import React from 'react';
import './App.css';
import DragAndDrop from './DragAndDrop'

function App() {
  return (
    <div className="App">
      <h1>IPL20 Image Fixer</h1>
      <p className='desc'>Website to fix IPL20 Images</p>
      <DragAndDrop />
      <h2 className='footer'>Made by Priyansu Choudhury</h2>
    </div>
  );
}

export default App;