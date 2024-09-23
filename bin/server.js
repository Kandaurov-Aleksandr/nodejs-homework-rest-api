const app = require('../app')
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const { URI_DB } = process.env

const connection = mongoose.connect(URI_DB, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful. Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch(error => {
    console.log(`Server not running. Error message: ${error.message}`)
    process.exit(1)
  })
