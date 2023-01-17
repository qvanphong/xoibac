const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(
  "mongodb://localhost:27017/bet?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false")

module.exports = { mongoose }
