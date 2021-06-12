require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const PORT = process.env.PORT || 3000
const DB = process.env.DB_PATH
// const cors = require('cors')

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
.then(res => app.listen(PORT))

// Cors options
// const corsOptions = {
//   exposedHeaders: ['token']
// }

// app.use(cors(corsOptions))
app.use(express.json())
app.use('/api', routes)