import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Debug Theme Toggle */}
        <ThemeToggle className="debug" />
        
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;