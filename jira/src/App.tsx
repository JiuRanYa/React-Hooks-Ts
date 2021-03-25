import React from 'react';
import './App.css';
import { ProjectListScreen } from 'screens/project-list/index';
import { TsReactTest } from 'screens/project-list/try-use-array'

function App() {
  return (
    <div className="App">
      <ProjectListScreen />
      <TsReactTest />
    </div>
  );
}

export default App;
