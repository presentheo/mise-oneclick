const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const portNum = 3001;

app.use(express.json());
app.use(cors());
app.listen(portNum, () => {
  console.log(`Express server is working on port: ${portNum}`)
})

const serviceKey = 'nozfxnlY9wLbTdy42QYSP77wffJ3N254W6W5rCrZcEEQzf%2BAPCOipe8RkYjgeP8SFdHyBtL64R3KEbBsAqZMbQ%3D%3D';
const realtimeEndpoint = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
const dailyAndHourlyEndpoint = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureLIst';

// const getJson = () => {
//   let url = '';
//   if (divide === 'realtime'){
//     url = `${realtimeEndpoint}?serviceKey=${serviceKey}&numOfRows=10&pageNo=1&sidoName=${encodeURI(city)}&ver=1.3&_returnType=json`
//   }else if (divide === 'daily'){
//     url = `${dailyAndHourlyEndpoint}?serviceKey=${serviceKey}&numOfRows=7&pageNo=1&itemCode=PM10&dataGubun=DAILY&searchCondition=WEEK&_returnType=json`
//   }else if (divide === 'hourly'){
//     url = `${dailyAndHourlyEndpoint}?serviceKey=${serviceKey}&numOfRows=12&pageNo=1&itemCode=PM10&dataGubun=HOUR&searchCondition=WEEK&_returnType=json`
//   }
//   request(url, (error, response, body) => {
//     // let json = JSON.parse(body);
//     // res.setHeader('Content-Type', 'application/json')
//     res.send(JSON.parse(body));
//   })
// }

app.get('/realtime', (req, res) => {
  // getJson(res, 'realtime', req.query.city)

  // res.sendFile(__dirname+'/db/realtime.json');
  request({
    url: `${realtimeEndpoint}?serviceKey=${serviceKey}&numOfRows=10&pageNo=1&sidoName=${encodeURI(req.query.city)}&ver=1.3&_returnType=json`,
    method: 'GET'
  }, (error, response, body) => {
    res.send(body)
  })
})
app.get('/hourly', (req, res) => {
  res.sendFile(__dirname + '/db/hourly.json')
  // request({
  //   url: `${dailyAndHourlyEndpoint}?serviceKey=${serviceKey}&numOfRows=12&pageNo=1&itemCode=PM10&dataGubun=HOUR&searchCondition=WEEK&_returnType=json`,
  //   method: 'GET'
  // }, (error, response, body) => {
  //   res.send(body)
  // })
  // getJson(res, 'weekly', '서울')
})
app.get('/daily', (req, res) => {
  res.sendFile(__dirname+'/db/daily.json')
  // request({
  //   url: `${dailyAndHourlyEndpoint}?serviceKey=${serviceKey}&numOfRows=7&pageNo=1&itemCode=PM10&dataGubun=DAILY&searchCondition=WEEK&_returnType=json`,
  //   method: 'GET'
  // }, (error, response, body) => {
  //   res.send(body)
  // })
})