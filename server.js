import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Event from './event'
import path from 'path'
import moment from 'moment'

const app = express()
const port = process.env.PORT || 3001
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost/eventDB'

const regExpDate = new RegExp("[0-9]{4}-[0-9]{2}-[0-9]{2}")

const SEARCH_TYPE_CALENDAR = "calendar"
const SEARCH_TYPE_WEEKEND = "weekend"
const SEARCH_TYPE_WEEKDAY = "weekday"

const TERM_TYPE_WITH_IN_A_WEEK = "withinaweek"

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(bodyParser.urlencoded({ extended: true  }))
app.use(bodyParser.json())

mongoose.connect(dbUrl,{useNewUrlParser: true }, dbErr => {
   if (dbErr) throw new Error(dbErr)
   else console.log('connected')

   app.get('/api/events', (request, response) => {

     let keywordsArray = createKeywordsArray(request.query.keywords)
     let selectedDate = request.query.selectedDate

     //キーワード検索のキーワードが送られてきたか？
     const hasSentSearchWords = request.query.keywords.trim() !== ""

     let searchKeywordsObjectArrayForDB

    　//送られてきた場合、検索用の配列を作っておく
     if (hasSentSearchWords) {
       searchKeywordsObjectArrayForDB =
          [
            //キーワード1
            {title: new RegExp(keywordsArray[0],"i")},
            {catch: new RegExp(keywordsArray[0],"i")},
            {description: new RegExp(keywordsArray[0],"i")},

            //キーワード2
            {title: new RegExp(keywordsArray[1],"i")},
            {catch: new RegExp(keywordsArray[1],"i")},
            {description: new RegExp(keywordsArray[1],"i")},

            //キーワード3
            {title: new RegExp(keywordsArray[2],"i")},
            {catch: new RegExp(keywordsArray[2],"i")},
            {description: new RegExp(keywordsArray[2],"i")}
          ]
     }

     //カレンダーの日付指定検索の場合
     if (request.query.searchType === SEARCH_TYPE_CALENDAR) {

        let startDate
        let endDate

        //日付データが正しい形式で送られているか？
        //日本時間とUTC時間との差分は9時間
        if (regExpDate.test(selectedDate)) {
            const tmpStartDate = moment(selectedDate).subtract(9, 'hours').utc()

            startDate = tmpStartDate.toISOString()
            endDate = tmpStartDate.add(24, 'hours').toISOString()
        } else {
            const tmpDate = moment().subtract(9, 'hours').utc().toISOString()

            startDate = tmpDate
            endDate = tmpDate
        }

        console.log('calendar searched' + ' startDate='+String(startDate+' endDate='+String(endDate)))

        //検索用語が指定されていない場合
        if (!hasSentSearchWords) {

          //DBから検索する
          Event.find(
            {started_at:{$gte:startDate,$lt:endDate}},
            (err, eventArray) => {
              if (err) {
                response.status(500).send()
              } else {
                response.status(200).send(eventArray)
              }
            }
          )

        } else { //検索用語が指定されている場合
          Event.find(
              {$and: [
                {started_at:{$gte:startDate,$lt:endDate}},
                {$or:searchKeywordsObjectArrayForDB}
              ]}
              , (err, eventArray) => { 
              if (err) response.status(500).send()
                else response.status(200).send(eventArray)
              })
        }
      } else if (request.query.searchType === SEARCH_TYPE_WEEKEND) {

        console.log('weekend searched')

        const startDate = moment().utc().toISOString()
        let endDate
        if (request.query.termType === TERM_TYPE_WITH_IN_A_WEEK) {
          endDate = moment().utc().add(7, 'days').toISOString()
        } else {
          endDate = moment().utc().add(3, 'weeks').toISOString()
        }

        //検索用語が指定されていない場合
        if (!hasSentSearchWords) {

          Event.find(
            {$and: [
              {$or:[{day_of_the_week:0},{day_of_the_week:6}]},
              {started_at:{$gte:startDate,$lt:endDate}}
            ]}, (err, eventArray) => {  // 取得したドキュメントをクライアント側と同じくcharacterArrayと命名
          if (err) response.status(500).send()
            else response.status(200).send(eventArray)
          })

        } else { //検索用語が指定されている場合

          Event.find(
            {$and: [
              {$or:[{day_of_the_week:0},{day_of_the_week:6}]},
              {started_at:{$gte:startDate,$lt:endDate}},
              {$or:searchKeywordsObjectArrayForDB}
            ]}, (err, eventArray) => {  

          if (err) response.status(500).send()
            else response.status(200).send(eventArray)
          })
        }
      } else if (request.query.searchType === SEARCH_TYPE_WEEKDAY) {

        console.log('weekday searched')

        const startDate = moment().utc().toISOString()
        let endDate

        if (request.query.termType === TERM_TYPE_WITH_IN_A_WEEK) {
          endDate = moment().utc().add(7, 'days').toISOString()
        } else {
          endDate = moment().utc().add(3, 'weeks').toISOString()
        }

        //検索用語が指定されていない場合
        if (!hasSentSearchWords) {
          Event.find(
            {$and: [
              {day_of_the_week:{$gte:1,$lte:5}},
              {started_at:{$gte:startDate,$lt:endDate}}
            ]}, (err, eventArray) => {  
          if (err) response.status(500).send()
            else response.status(200).send(eventArray)
          })

        } else { //検索用語が指定されている場合

          Event.find(
            {$and: [
              {day_of_the_week:{$gte:1,$lte:5}},
              {started_at:{$gte:startDate,$lt:endDate}},
              {$or:searchKeywordsObjectArrayForDB}
            ]}, (err, eventArray) => { 
          if (err) response.status(500).send()
            else response.status(200).send(eventArray)
          })

        }
      } else {
        //searchTypeが規定外であればエラー
        response.status(500).send()
      }
    })

   app.listen(port, err => {
     if (err) throw new Error(err)
     else console.log(`listening on port ${port}`)
   })
})

//キーワード文字列を処理するための関数
function createKeywordsArray (keyStr) {

  if(keyStr === '') {
    return []
  }

  //妙な文字で区切られていた場合でも処理する
  let keywordsString = 
        keyStr
        .replace(/　/g,' ')
        .replace(/,/g,' ')
        .replace(/</g,' ')
        .replace(/>/g,' ')
        .replace(/"/g,' ')
        .replace(/'/g,' ')
        .replace(/\s+/g, ' ')
        .trim()

  let keywordsArray = keywordsString.split(' ')

  //配列の空の部分は後で検索時に弾くため否定表現を入れておく
  for(let i = 0; i <= 2; i++) {
    if(typeof keywordsArray[i] === "undefined") {
      //全てを否定する正規表現
      keywordsArray[i] = "(?!)"
    }
  }

  return keywordsArray
}