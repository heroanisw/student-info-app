import React, { useState } from 'react';
import axios from 'axios';

function AddStudentPage({ onStudentAdded }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [grade, setGrade] = useState('');

    const handleAddStudent = async () => {
        try {
            const newStudent = { name, age, grade };
            await axios.post('http://localhost:3001/students', newStudent);
            onStudentAdded(); // 학생 추가 후 리스트 갱신
            setName('');
            setAge('');
            setGrade('');
        } catch (error) {
            console.error('학생 추가 실패:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>학생 추가</h2>
            <input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
            />
            <input
                type="text"
                placeholder="나이"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
            />
            <input
                type="text"
                placeholder="학년"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
            />
            <button
                onClick={handleAddStudent}
                style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
            >
                학생 추가
            </button>
        </div>
    );
}

export default AddStudentPage;