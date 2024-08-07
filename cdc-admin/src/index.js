import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/index';
import Campeonato from './pages/Campeonato';
import Final from './pages/Final';
import './index.css';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/campeonato" element={<Campeonato />} />
      <Route path="/final" element={<Final />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
