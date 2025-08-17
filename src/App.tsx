import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import PixelPerfect from './pages/Products/PixelPerfect/PixelPerfect';
import Comerzia from './pages/Products/Comerzia/Comerzia';
import ComChat from './pages/Products/ComChat/ComChat';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Debug Theme Toggle */}
        {/* <ThemeToggle className="debug" /> */}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/pixelperfect" element={<PixelPerfect />} />
          <Route path="/products/comerzia" element={<Comerzia />} />
          <Route path="/products/comchat" element={<ComChat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;