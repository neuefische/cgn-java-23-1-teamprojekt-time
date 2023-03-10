import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import TasksGallery from "./page/TasksGallery";
import AddTask from "./page/AddTask";
import UpdateTask from "./page/UpdateTask";
import useTasks from "./hooks/useTasks";
import TaskDetails from "./page/TaskDetails";
import Footer from "./component/Footer";
import WeekGallery from "./page/WeekGallery";
import SingleDayView from "./page/SingleDayView";
import axios from "axios";
import Cookies from "js-cookie";
import SignInPage from "./page/SignInPage";
import SignUpPage from "./page/SignUpPage";

axios.interceptors.request.use(function (config) {
    return fetch("/api/csrf").then(() => {
        config.headers["X-XSRF-TOKEN"] = Cookies.get("XSRF-TOKEN");
        return config;
    });
}, function (error) {
    return Promise.reject(error);
});
function App() {
    const {tasks,postNewTask,updateTask,deleteTask}=useTasks()
  return (
    <div className="App">

            <Routes>
                <Route path={"/"} element={<TasksGallery tasks={tasks}/>}/>
                <Route path={"/sign-up"} element={<SignUpPage/>}/>
                <Route path={"/sign-in"} element={<SignInPage/>}/>
                <Route path={"/tasks"} element={<TasksGallery tasks={tasks}/>}/>
                <Route path={"/tasks/add"} element={<AddTask onAdd={postNewTask}/>}/>
                <Route path={"/tasks/:id"} element={<TaskDetails tasks={tasks} deleteTask={deleteTask}/>}/>
                <Route path={"/tasks/:id/update"} element={<UpdateTask tasks={tasks} onUpdate={updateTask} />} />
                <Route path={"/tasks/:year/:month/:day"} element={<SingleDayView/>} />
                <Route path={"/tasks/:year/week/:week"} element={<WeekGallery />} />
            </Routes>

        <Footer/>
    </div>
  );
}

export default App;
