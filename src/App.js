import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import './App.css';
import InPlay from './screens/InPlay';
import PlayResult from './screens/PlayResult';
import Splash from './screens/Splash';

function App() {

  const [showSplash, setShowSplash] = useState(true)
  setTimeout(() => {
    setShowSplash(false)
  }, 3000);
  
  
  return (
    <div className="foroApp">
      <div className="foroApp__wideScreen"><p>Please open on mobile devices</p></div>
      {/* { showSplash ? <Splash /> : <InPlay />} */}
      <Router>
        <Routes>
          <Route exact path="/" element={ showSplash ? <Splash /> : <InPlay />} />
          <Route exact path="result" element={<PlayResult />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
