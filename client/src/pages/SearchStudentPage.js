// src/pages/SearchStudentPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SearchStudentPage.css';

function SearchStudentPage() {
  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/students?name=${searchName}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('학생 검색 실패:', error);
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#ffffff'
      }}>
        <h2 style={{
          fontWeight: 'bold',
          fontSize: '24px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>학생 검색</h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginBottom: '40px',
          maxWidth: '500px',
          margin: '0 auto 20px auto'
        }}>
          <input
            type="text"
            placeholder="이름 검색"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '200px'
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '10px 20px',
              borderRadius: '5px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '10px'
            }}
          >
            검색
          </button>
        </div>
        <table className="student-list" style={{
          width: '100%',
          margin: '0 auto',
          borderCollapse: 'collapse',
          marginBottom: '20px'
        }}>
          <thead>
            <tr>
              <th style={{
                backgroundColor: '#f0f0f0',
                padding: '15px',
                borderTop: '2px solid #ccc',
                borderBottom: '2px solid #ccc'
              }}>이름</th>
              <th style={{
                backgroundColor: '#f0f0f0',
                padding: '15px',
                borderTop: '2px solid #ccc',
                borderBottom: '2px solid #ccc'
              }}>나이</th>
              <th style={{
                backgroundColor: '#f0f0f0',
                padding: '15px',
                borderTop: '2px solid #ccc',
                borderBottom: '2px solid #ccc'
              }}>학년</th>
              <th style={{
                backgroundColor: '#f0f0f0',
                padding: '15px',
                borderTop: '2px solid #ccc',
                borderBottom: '2px solid #ccc'
              }}>수정</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((student) => (
              <tr key={student._id}>
                <td style={{
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  textAlign: 'center'
                }}>{student.name}</td>
                <td style={{
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  textAlign: 'center'
                }}>{student.age ? student.age : '-'}</td>
                <td style={{
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  textAlign: 'center'
                }}>{student.grade ? student.grade : '-'}</td>
                <td style={{
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  textAlign: 'center'
                }}>
                  <Link to={`/edit-student/${student._id}`}>
                    <button style={{
                      padding: '5px 10px',
                      borderRadius: '5px',
                      backgroundColor: '#007BFF',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer'
                    }}>
                      수정
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SearchStudentPage;