const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 4000;

// json 요청 본문을 해석해서 js로 전환 (파싱)
app.use(express.json());
// 모든 출처에서의 요청 허용
app.use(cors());

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.get('/', (req, res) => {
//   res.send('반갑습니다.');
// });

// 프론트엔드에서 받은 action과 time을 다시 프론트에게 전달.
app.post('/page1', (req, res) => {
  const { action, time } = req.body;
  try {
    console.log(`action : ${action}, time : ${time}`);
    res.json({ action, time }); // json 형식으로 전달
  } catch (e) {
    console.log('error : ', e);
    res.status(500).send('서버 오류');
  }
});

app.listen(port, () => {
  console.log(`${port}번 포트에서 열렸습니다.`);
});
