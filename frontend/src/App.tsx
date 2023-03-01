import React  from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import TasksGallery from "./component/TasksGallery";
import AddTask from "./component/AddTask";
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
       </Routes>
    </div>
  );
}

export default App;
