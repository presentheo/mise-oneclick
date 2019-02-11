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

// const endPoint = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
// const serviceKey = 'nozfxnlY9wLbTdy42QYSP77wffJ3N254W6W5rCrZcEEQzf%2BAPCOipe8RkYjgeP8SFdHyBtL64R3KEbBsAqZMbQ%3D%3D';

const options = {
  url: 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureLIst?serviceKey=nozfxnlY9wLbTdy42QYSP77wffJ3N254W6W5rCrZcEEQzf%2BAPCOipe8RkYjgeP8SFdHyBtL64R3KEbBsAqZMbQ%3D%3D&numOfRows=12&pageNo=1&itemCode=PM10&dataGubun=HOUR&searchCondition=WEEK&_returnType=json',
  method: 'GET'
}

app.get('/data/realtime', (req, res) => {
  request(options, (error, response, body) => {
    let json = JSON.parse(body);
    res.setHeader('Content-Type', 'application/json')
    res.send(json);
  })
})

app.get('/data/daily', (req, res) => {
  request({
    url: 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureLIst?serviceKey=nozfxnlY9wLbTdy42QYSP77wffJ3N254W6W5rCrZcEEQzf%2BAPCOipe8RkYjgeP8SFdHyBtL64R3KEbBsAqZMbQ%3D%3D&numOfRows=7&pageNo=1&itemCode=PM10&dataGubun=DAILY&searchCondition=WEEK&_returnType=json',
    method: 'GET'
  }, (error, response, body) => {
    let json = JSON.parse(body);
    res.setHeader('Content-Type', 'application/json')
    res.send(json);
  })
})

app.get('/data/hourly', (req, res) => {
  request({
    url: 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureLIst?serviceKey=nozfxnlY9wLbTdy42QYSP77wffJ3N254W6W5rCrZcEEQzf%2BAPCOipe8RkYjgeP8SFdHyBtL64R3KEbBsAqZMbQ%3D%3D&numOfRows=12&pageNo=1&itemCode=PM10&dataGubun=HOUR&searchCondition=WEEK&_returnType=json',
    method: 'GET'
  }, (error, response, body) => {
    let json = JSON.parse(body);
    res.setHeader('Content-Type', 'application/json')
    res.send(json);
  })
})

