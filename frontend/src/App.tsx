import React, {useEffect, useState} from 'react';
import './App.css';
import {NewTask, Task} from "./model/Task";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import TasksGallery from "./component/TasksGallery";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import AddTask from "./component/AddTask";

function App() {
  const [tasks,setTasks]=useState<Task[]>([]);

  function loadAllTasks(){
  axios.get("/api/tasks/")
      .then(response=>response.data.map(task=>({id:task.id,title:task.title,dateTime:new Date(task.dateTime)})))
      .then(setTasks)
      .catch(console.error)
  }

  function postNewTask(newTask:NewTask){
     return axios.post("/api/tasks/",newTask)
          .then(response=>{
              setTasks(prevState => [...prevState,response.data])
          })
          .catch(console.error)
  }

  useEffect(()=> {
      loadAllTasks()
  },[])

  return (
    <div className="App">
       <Routes>
           <Route path={"/tasks"} element={<TasksGallery tasks={tasks}/>}/>
           <Route path={"/addTask"} element={<AddTask onAdd={postNewTask}/>}/>
       </Routes>
    </div>
  );
}

export default App;
