import React, { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./components/Todo";
import Add from "./components/Add";

import "./App.css";
//import Todo from '../../backend/todo';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // should bring data using axios
    // from backend (GET / tasks)
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        // console.log('RESPONSE: ',response);
        console.log("DATA: ", response.data);
        setTasks(response.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const postNewTodo =(body)=>{
    //console.log('func postNewTodo from App')
    // {"title":"task 7","isCompleted": false}
     axios
       .post("http://localhost:5000/tasks",body)
       .then((response) => {
        // console.log('RESPONSE: ',response);
         console.log("DATA: ", response.data);
         //setTasks(response.data);
         getData()
       })
       .catch((err) => {
         console.log("ERR: ", err);
       });
    
  }

  const mapOverTasks = tasks.map((taskObj, i) => (
    <Todo key={i} task={taskObj} />
  ));

  return (
    <div className="App">
      <p>app</p>
      <Add createFunc={postNewTodo} />
      {/* when click on this button should call function bring Data */}
      <button onClick={getData}>GET TASKS</button>
      {mapOverTasks}
    </div>
  );
}

export default App;
