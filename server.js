const PORT = process.env.PORT || 3000
const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Simple Server - Use Post to filter json ojbects')
})

app.post('/', function (req, res) {
  if (!req.body.payload) throw new createError(400, 'JSON PARSE FAILED')
  const flatten = ({ image, ...rest }) => {
    return Object.assign({}, { image: image.showImage }, rest)
  }
  res.send({
    response: _.filter(
      req.body.payload,
      (e) => e.drm == true && e.episodeCount > 0
    ).map((e) =>
      flatten(
        _.pickBy(
          e,
          (value, key) => key === 'image' || key === 'slug' || key === 'title'
        )
      )
    ),
  })
})

app.listen(PORT, function () {
  console.log(`Listening on Port ${PORT}`)
})

app.use(function (err, req, res, next) {
  res.status(err.status || 400).json({
    error: 'Could not decode request: JSON parsing failed',
  })
})

module.exports = app
