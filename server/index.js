// server/index.js

const mongoose = require('mongoose');

// MongoDB에 연결합니다.
mongoose.connect('mongodb://localhost:27017/studentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 연결이 성공하면 메시지를 표시합니다.
mongoose.connection.on('connected', () => {
    console.log('MongoDB에 성공적으로 연결되었습니다.');
});

// 연결이 실패하면 오류 메시지를 표시합니다.
mongoose.connection.on('error', (err) => {
    console.log('MongoDB 연결 오류:', err);
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Express 서버 생성
const app = express();
app.use(cors());
app.use(bodyParser.json());

// 학생 모델 정의
const Student = mongoose.model('Student', new mongoose.Schema({
    name: String,
    age: Number,
    grade: String,
}));

// 학생 정보 추가 API
app.post('/students', async (req, res) => {
    const { name, age, grade } = req.body;
    const newStudent = new Student({ name, age, grade });
    await newStudent.save(); // MongoDB에 저장
    res.send(newStudent);
});

// 학생 정보 검색 API
app.get('/students', async (req, res) => {
    const { name, grade } = req.query;
    const filter = {};
    if (name) filter.name = new RegExp(name, 'i'); // 이름 검색
    if (grade) filter.grade = grade; // 학년 검색
    const students = await Student.find(filter);
    res.send(students);
});

// 서버 실행
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
