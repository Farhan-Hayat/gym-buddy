const express = require("express");
const router = express.Router();
const { createWorkout , getAllWorkouts , getSingleWorkout,deleteWorkout ,updateWorkout } = require("../controllers/workoutController");
// Get all workouts
router.get("/", getAllWorkouts);

// get single workout
router.get("/:id", getSingleWorkout);

// post a new workout
router.post("/", createWorkout);

// delete a workout
router.delete("/:id", deleteWorkout);

// update a workout
router.patch("/:id", updateWorkout);
module.exports = router;
