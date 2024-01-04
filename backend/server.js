require('dotenv').config()
const express = require("express")
const workoutRoutes = require("./routes/workouts")
const mongoose = require("mongoose")

const app = express()

// Listen to server

// middleware
app.use(express.json())
app.use((req,res,next)=>{
  console.log(req.path,req.method)
  next()
})

// connect to db
mongoose.connect(process.env.DB_URI)
.then(()=>{
  app.listen(process.env.PORT , ()=>{
    console.log("Connected to DB & Listening on port 4000")
  })
})
.catch((err)=>{
  console.log(err)
})


// routes
app.use("/api/workouts" , workoutRoutes)