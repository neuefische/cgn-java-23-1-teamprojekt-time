import React, {useEffect, useState} from 'react';
import './App.css';
import {Task} from "./model/Task";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import TasksGallery from "./component/TasksGallery";
import AddTask from "./component/AddTask";
import UpdateTask from "./component/UpdateTask";

function App() {
  const [tasks,setTasks]=useState<Task[]>([]);

  function loadAllTasks(){
  axios.get("/api/tasks/")
      .then(response => response.data
          .map((task: { dateTime: string; }) =>
              ({
                  ...task,
                  dateTime:new Date(task.dateTime)
              })
          )
      )
      .then(setTasks)
      .catch(console.error)
  }

  function postNewTask(newTask: Task){
     return axios.post("/api/tasks/",newTask)
          .then(response=>{
              const returnedTask ={
                  ...response.data,
                  dateTime:new Date(response.data.dateTime)
              }
              setTasks(prevState => [...prevState,returnedTask])
          })
          .catch(console.error)
  }

  function updateTask(task:Task){
      return axios.put("/api/tasks/"+task.id,task)
          .then(response=>{
              setTasks(prevState => {
                      return prevState.map(currentTask=>{
                          if (currentTask.id===task.id){
                              return {
                                  ...response.data,
                                  dateTime:new Date(response.data.dateTime)
                              }
                          }
                          return currentTask
                      })
                  }
              )
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
           <Route path={"/tasks/add"} element={<AddTask onAdd={postNewTask}/>}/>
           <Route path={"/tasks/:id/update"} element={<UpdateTask tasks={tasks} onUpdate={updateTask} />} />
       </Routes>
    </div>
  );
}

export default App;
