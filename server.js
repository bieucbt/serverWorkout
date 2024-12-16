

const express = require('express');
const workoutRoutes = require('./routes/workouts.js')
const userRoutes = require('./routes/user.js')
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config()

// express app
const app = express()

// middleware 
app.use(cors())

app.use(express.json()) 

app.use((req, res, next) => {
  console.log(req.path, res.method)
  next()
})

  
// routes
app.use('/api/workout',workoutRoutes)
app.use('/api/user',userRoutes)

// connect to db
mongoose.connect(process.env.Mongo_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  // listen for requests
  app.listen(process.env.PORT, () =>{ 
    console.log('listen port ' + process.env.PORT)
  }) 
})
.catch((err) => console.log(err))


  
