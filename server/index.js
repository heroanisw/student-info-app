// server/index.js

const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB에 성공적으로 연결되었습니다.');
}).catch((err) => {
    console.error('MongoDB 연결 오류:', err);
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // 이미 존재하는 CORS 모듈 임포트

// Express 서버 생성
const app = express();

// CORS 옵션 설정 추가
const corsOptions = {
    origin: 'http://localhost:3000', // 프론트엔드 주소 (React 서버의 주소)
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // CORS 설정 적용

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
    try {
        const newStudent = new Student({ name, age, grade });
        await newStudent.save(); // MongoDB에 저장
        res.status(201).send(newStudent);
    } catch (error) {
        res.status(500).send({ error: '학생 추가 중 오류 발생' });
    }
});

// 학생 정보 수정 API
app.put('/students/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, grade, phoneNumber, guardianPhoneNumber, birthDate, schoolName, guardianName, address, email, enrollmentDate } = req.body;
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { name, age, grade, phoneNumber, guardianPhoneNumber, birthDate, schoolName, guardianName, address, email, enrollmentDate },
            { new: true }
        );
        if (!updatedStudent) {
            return res.status(404).send({ error: '학생을 찾을 수 없습니다.' });
        }
        res.send(updatedStudent);
    } catch (error) {
        res.status(500).send({ error: '학생 정보 수정 중 오류 발생' });
    }
});

// 학생 정보 검색 API
app.get('/students', async (req, res) => {
    try {
        const { name, grade, sortBy } = req.query; // sortBy를 쿼리 파라미터로 추가
        const filter = {};
        if (name) filter.name = new RegExp(name, 'i'); // 이름 검색
        if (grade) filter.grade = grade; // 학년 검색

        // 정렬 기준에 따라 결과 정렬
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = 1; // 오름차순 정렬, 내림차순의 경우 -1로 변경
        }

        const students = await Student.find(filter).sort(sortOptions);
        res.send(students);
    } catch (error) {
        res.status(500).send({ error: '학생 조회 중 오류 발생' });
    }
});

// 학생 개별 정보 조회 API (새로 추가된 부분)
app.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send({ error: '해당 학생을 찾을 수 없습니다.' });
        }
        res.send(student);
    } catch (error) {
        res.status(500).send({ error: '학생 정보를 가져오는 중 오류 발생' });
    }
});

// 서버 실행
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});