import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '@mui/material'; // Material UI 기본 스타일 초기화
import { ThemeProvider, createTheme } from '@mui/material/styles'; // 테마 제공자를 사용하기 위한 설정

// 기본 테마 생성
const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> {/* 모든 컴포넌트에 Material UI 테마 적용 */}
      <CssBaseline /> {/* 기본 브라우저 스타일 초기화 */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();