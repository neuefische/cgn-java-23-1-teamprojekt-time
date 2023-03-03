import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import TasksGallery from "./component/TasksGallery";
import AddTask from "./component/AddTask";
import UpdateTask from "./component/UpdateTask";
import useTasks from "./hooks/useTasks";
import TaskDetails from "./component/TaskDetails";
import Header from "./component/Header";
import Footer from "./component/Footer";
import DayGallery from "./component/DayGallery";


function App() {
    const {tasks,postNewTask,updateTask,deleteTask}=useTasks()
  return (
    <div className="App">
        <Header/>
        <main className={"main-content"}>
            <Routes>
                <Route path={"/tasks"} element={<TasksGallery tasks={tasks}/>}/>
                <Route path={"/tasks/add"} element={<AddTask onAdd={postNewTask}/>}/>
                <Route path={"/tasks/:id"} element={<TaskDetails tasks={tasks} deleteTask={deleteTask}/>}/>
                <Route path={"/tasks/:id/update"} element={<UpdateTask tasks={tasks} onUpdate={updateTask} />} />
                <Route path={"/tasks/:year/:month/:day"} element={<DayGallery />} />
            </Routes>
        </main>

        <Footer/>
    </div>
  );
}

export default App;
