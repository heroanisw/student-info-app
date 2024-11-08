import React, { useState } from 'react';
import axios from 'axios';

function AddStudent() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [grade, setGrade] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/students', { name, age, grade });
            console.log('학생 추가 성공:', response.data);
        } catch (error) {
            console.error('학생 추가 실패:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="나이" value={age} onChange={(e) => setAge(e.target.value)} />
            <input type="text" placeholder="학년" value={grade} onChange={(e) => setGrade(e.target.value)} />
            <button type="submit">학생 추가</button>
        </form>
    );
}

export default AddStudent;