import React, {useEffect, useState} from 'react';
import './App.css';
import {Task} from "./model/Task";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import TasksGallery from "./component/TasksGallery";

function App() {
  const [tasks,setTasks]=useState<Task[]>([]);

  function loadAllTasks(){
  axios.get("/api/tasks")
      .then(response=>response.data)
      .then(setTasks)
      .catch(console.error)
  }
  useEffect(()=> {
      // loadAllTasks()
      const fakeJson: Task[] = [
          {
              id: "1",
              title: "Erster Task",
              dateTime: new Date()
          },
          {
              id: "2",
              title: "Zweiter Task",
              dateTime: new Date()
          },
          {
              id: "3",
              title: "Dritter Task",
              dateTime: new Date()
          },
      ];
      setTasks(fakeJson);
  },[])

  return (
    <div className="App">
       <Routes>
           <Route path={"/tasks"} element={<TasksGallery tasks={tasks}/>}/>
       </Routes>
    </div>
  );
}

export default App;
