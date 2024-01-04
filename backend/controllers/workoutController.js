const Mongoose = require("mongoose");
const Workout = require("../models/workoutModel");

//get all workouts
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find();
  res.status(200).json(workouts);
};

//get a single workout
const getSingleWorkout = async (req, res) => {
  const id = req.params.id;
  if (!Mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No workout found" });
  }
  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(400).json({ error: `no workout with the given id` });
  }

  res.status(200).json(workout);
};

//create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  const emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }

  if(emptyFields.length>0){
    return res.status(400).json({error:"Please fill in the fields" , emptyFields})
  }
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const id = req.params.id;
  if (!Mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No workout found" });
  }
  const workout = await Workout.findByIdAndDelete(id);
  if (!workout) {
    res.status(400).json({ error: "No Workout found" });
  }
  res.status(200).json(workout);
};

//update a workout

const updateWorkout = async (req, res) => {
  const id = req.params.id;
  if (!Mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No workout found" });
  }
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workout) {
    res.status(400).json({ error: "No Workout found" });
  }
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
