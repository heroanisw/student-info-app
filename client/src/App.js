// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AddStudentPage from './pages/AddStudentPage';
import SearchStudentPage from './pages/SearchStudentPage';
import EditStudentPage from './pages/EditStudentPage'; // 추가된 부분
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('');

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>히어로애니 수강생 정보 관리 DB</h1>
        </header>
        <nav className="nav-container-horizontal">
          <ul className="nav-list-horizontal">
            <li>
              <Link
                to="/add-student"
                className={`nav-item ${activePage === 'add-student' ? 'active' : ''}`}
                onClick={() => handlePageChange('add-student')}
              >
                ✏️&nbsp;수강생 등록
              </Link>
            </li>
            <li>
              <Link
                to="/search-student"
                className={`nav-item ${activePage === 'search-student' ? 'active' : ''}`}
                onClick={() => handlePageChange('search-student')}
              >
                👥&nbsp;수강생 목록
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/add-student" element={<AddStudentPage />} />
          <Route path="/search-student" element={<SearchStudentPage />} />
          <Route path="/edit-student/:id" element={<EditStudentPage />} /> {/* 추가된 부분 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;