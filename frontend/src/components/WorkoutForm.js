import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";


const WorkoutForm = () => {
  const {dispatch} = useWorkoutContext()
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");
  const [emptyFields , setEmptyFields] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
  
    fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(json => {
          setError(json.error);
          setEmptyFields(json.emptyFields)
        });
      } else {
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
        setEmptyFields([])
        return response.json().then(json => {
          console.log("new blog edit", json);
          dispatch({type:"CREATE_WORKOUT" , payload:json})
        });
      }
    })
    .catch(error => {
      console.error("Error occurred:", error);
      // Handle any other errors here, if needed.
    });
  };
  
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label>Exercise Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Load (kg)</label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label>Reps</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
