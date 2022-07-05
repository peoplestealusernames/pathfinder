import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ToggleBlock } from './ToggleBlock'
import { ToggleGrid } from './ToggleGrid';

function App() {
  return (
    <div className="App">
      <ToggleGrid x={30} y={60} />
    </div>
  );
}

export default App;
