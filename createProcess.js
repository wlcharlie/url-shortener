const List = require('./models/list')
const toShort = require('./toShort')

function createProcess(req, res) {
  let original = req.body.url
  let shortenUrl = toShort()

  List.findOne({ shortenUrl })
    .then(find => {

      if (find) {
        while (find.shortenUrl === shortenUrl) {
          shortenUrl = toShort()
        }
      }

      let theResult = `http://${req.headers.host}${req.path}${shortenUrl}`
      let data = { original, shortenUrl }
      List.create(data)
        .then(() => res.render('index', { data, theResult }))
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
}

module.exports = createProcess