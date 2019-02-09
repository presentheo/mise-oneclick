const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const portNum = 3001;

app.use(express());
app.use(cors());
app.listen(portNum, () => {
  console.log(`Express server is working on port: ${portNum}`)
})

const options = {
  url: 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=nozfxnlY9wLbTdy42QYSP77wffJ3N254W6W5rCrZcEEQzf%2BAPCOipe8RkYjgeP8SFdHyBtL64R3KEbBsAqZMbQ%3D%3D&numOfRows=10&pageNo=1&sidoName=%EC%84%9C%EC%9A%B8&ver=1.3&_returnType=json',
  method: 'GET'
}

app.get('/data', (req, res) => {
  request(options, (error, response, body) => {
    let json = JSON.parse(body);
    res.setHeader('Content-Type', 'application/json')
    res.send(json);
  })
})
