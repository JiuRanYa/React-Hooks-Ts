import React from 'react';
import './App.css';
import {LoginScreen} from 'screens/login';
import { AppProvicers } from 'context'

function App() {
  return (
    <AppProvicers>
      <div className="App">
        {/* <ProjectListScreen /> */}
        {/* <TsReactTest /> */}
        <LoginScreen />
      </div>  
    </AppProvicers>
  );
}

export default App;
