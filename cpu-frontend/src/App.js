import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CpuList from './components/CpuList';
import CpuDetail from './components/CpuDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>CPU Management System</h1>
        <Routes>
          <Route path="/" element={<CpuList />} />
          <Route path="/cpus/new" element={<CpuDetail />} />
          <Route path="/cpus/:id" element={<CpuDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
