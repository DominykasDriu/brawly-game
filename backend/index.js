require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const PORT = process.env.PORT || 3000
const DB = process.env.DB_PATH

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
.then(res => app.listen(PORT))

app.use(cors())
app.use(express.json())
app.use('/api', routes)