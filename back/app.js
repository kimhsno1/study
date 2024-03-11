const express = require('express');

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('반갑습니다.');
});

app.listen(port, () => {
  console.log(`${port}번 포트에서 열렸습니다.`);
});