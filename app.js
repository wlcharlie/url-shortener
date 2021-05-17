const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const List = require('./models/list')
const createProcess = require('./createProcess')

const app = express()
const PORT = process.env.PORT || 3000

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/url-shortener'
mongoose.connect
  (MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
  })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

//createProcess會在使用者送出url後，去驗證有無重複短網址，再生產短網址
app.post('/', (req, res) => {
  createProcess(req, res)
})

app.get('/:short', (req, res) => {
  List.findOne({ shortenUrl: req.params.short })
    .lean()
    .then(obj => res.redirect(obj.original))
    .catch(err => console.error(err))
})

app.listen(PORT, () => {
  console.log(`app is listening on http://localhost:${PORT}`)
})