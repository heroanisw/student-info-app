// server/index.js

const mongoose = require('mongoose');

// MongoDB Atlas 연결 URI를 환경 변수에서 가져오기
const mongoURI = process.env.MONGODB_URI;

// MongoDB에 연결합니다.
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB에 성공적으로 연결되었습니다.');
}).catch((err) => {
    console.log('MongoDB 연결 오류:', err);
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Express 서버 생성
const app = express();
app.use(cors());
app.use(bodyParser.json());

// 루트 경로에 대한 응답 정의
app.get('/', (req, res) => {
    res.send('학생 정보 관리 API에 오신 것을 환영합니다.');
});

// 학생 모델 정의
const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    grade: { type: String, required: true },
});

const Student = mongoose.model('Student', StudentSchema);

// 학생 정보 추가 API
app.post('/students', async (req, res) => {
    try {
        const { name, age, grade } = req.body;
        const newStudent = new Student({ name, age, grade });
        await newStudent.save(); // MongoDB에 저장
        res.status(201).send(newStudent);
    } catch (error) {
        res.status(500).send({ error: '학생 정보를 저장하는 중 오류가 발생했습니다.' });
    }
});

// 학생 정보 검색 API
app.get('/students', async (req, res) => {
    try {
        const { name, grade } = req.query;
        const filter = {};
        if (name) filter.name = new RegExp(name, 'i'); // 이름 검색
        if (grade) filter.grade = grade; // 학년 검색
        const students = await Student.find(filter);
        res.send(students);
    } catch (error) {
        res.status(500).send({ error: '학생 정보를 검색하는 중 오류가 발생했습니다.' });
    }
});

// 서버 실행
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});