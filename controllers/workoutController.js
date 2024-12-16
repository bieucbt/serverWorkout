const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')


// get all workout
const getAllWorkout = async (req, res) => {
  // find({}) lấy all , find({reps: 20}) lấy nhưng giá trị có reps 20, sort({createdAt: -1} sắp xếp giảm dần  
  const workouts = await Workout.find({}).sort({createdAt: -1})
  res.status(200).json(workouts)
}

// get single workout
const getWorkout = async (req, res) => {
  // id này lấy sau url /:id
  const {id} = req.params
  
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({mess: 'no such workout'})
  }

  const workout = await Workout.findById(id)

  if(!workout) return res.status(404).json('no such workout')

  res.status(200).json(workout)
}

// create new workout
const createWorkout = async (req, res) => {
  const {title, reps, load} = req.body
  //add doc to db
  try{
    const workout = await Workout.create({title, reps, load})
    res.status(200).json(workout)
  }
  catch(err){
    res.status(400).json({mess: err.message})
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  // id này lấy sau url /:id
  const {id} = req.params
    
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({mess: 'no such workout'})
  }
  // mongoDB id phải _id ở dưới
  const workout = await Workout.findOneAndDelete({_id: id})

  if(!workout) return res.status(404).json('no such workout')

  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  console.log('update')
  // id này lấy sau url /:id
  const {id} = req.params
    
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({mess: 'no such workout'})
  }

  // mongoDB id phải _id ở dưới
  const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body})

  if(!workout) return res.status(404).json('no such workout')

    res.status(200).json(workout)
} 


module.exports = {
  createWorkout,
  getAllWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout
}