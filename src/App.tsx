import React from 'react';
import './App.css';
import { ProjectListScreen } from 'screens/project-list/index';
import { TsReactTest } from 'screens/project-list/try-use-array'
import { LoginScren } from 'screens/login';

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      {/* <TsReactTest /> */}
      <LoginScren></LoginScren>
    </div>
  );
}

export default App;