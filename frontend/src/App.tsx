import React, {useEffect, useState} from 'react';
import './App.css';
import {Task} from "./model/Task";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import TasksGallery from "./component/TasksGallery";
import AddTask from "./component/AddTask";
import UpdateTask from "./component/UpdateTask";
import useTasks from "./hooks/useTasks";
import TaskDetails from "./component/TaskDetails";

function App() {
    const {tasks,postNewTask}=useTasks()
  return (
    <div className="App">
       <Routes>
           <Route path={"/tasks"} element={<TasksGallery tasks={tasks}/>}/>
           <Route path={"/tasks/add"} element={<AddTask onAdd={postNewTask}/>}/>
           <Route path={"/tasks/:id"} element={<TaskDetails tasks={tasks}/>}/>
           <Route path={"/tasks/:id/update"} element={<UpdateTask tasks={tasks} onUpdate={updateTask} />} />
       </Routes>
    </div>
  );
}

export default App;
