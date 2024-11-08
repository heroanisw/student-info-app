import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditStudentPage.css';

function EditStudentPage() {
    const { id } = useParams();
    const [student, setStudent] = useState({
        name: '',
        age: '',
        grade: '',
        school: '',
        contact: '',
        guardianContact: '',
        birthdate: '',
        enrollmentDate: '',
        classFrequency: '',
        address: '',
        temperamentColor: '',
        discType: '',
        mbti: '',
        status: '',
    });

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/students/${id}`);
                setStudent(response.data);
            } catch (error) {
                console.error('학생 정보 가져오기 실패:', error);
            }
        };

        fetchStudent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3001/students/${id}`, student);
            alert('학생 정보가 성공적으로 수정되었습니다.');
        } catch (error) {
            console.error('학생 정보 수정 실패:', error);
        }
    };

    return (
        <div className="edit-student-container">
            <h2>학생 정보 수정</h2>
            <div className="edit-student-form">
                <div className="form-group">
                    <label>이름:</label>
                    <input type="text" name="name" value={student.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>나이:</label>
                    <input type="number" name="age" value={student.age} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>학년:</label>
                    <input type="text" name="grade" value={student.grade} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>학교명:</label>
                    <input type="text" name="school" value={student.school} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>원생 연락처:</label>
                    <input type="text" name="contact" value={student.contact} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>보호자 휴대폰 번호:</label>
                    <input type="text" name="guardianContact" value={student.guardianContact} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>생년월일:</label>
                    <input type="date" name="birthdate" value={student.birthdate} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>입학일:</label>
                    <input type="date" name="enrollmentDate" value={student.enrollmentDate} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>수업 횟수:</label>
                    <input type="text" name="classFrequency" value={student.classFrequency} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>주소:</label>
                    <input type="text" name="address" value={student.address} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>컬러기질:</label>
                    <input type="text" name="temperamentColor" value={student.temperamentColor} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>DISC 유형:</label>
                    <input type="text" name="discType" value={student.discType} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>MBTI:</label>
                    <input type="text" name="mbti" value={student.mbti} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>수강 상태:</label>
                    <input type="text" name="status" value={student.status} onChange={handleChange} />
                </div>
                <button onClick={handleSave}>저장</button>
            </div>
        </div>
    );
}

export default EditStudentPage;