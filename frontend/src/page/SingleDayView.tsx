import {useNavigate, useParams} from "react-router-dom";
import DayGallery from "../component/DayGallery";
import moment from "moment";
import Layout from "../component/Layout";
import useAuth from "../hooks/useAuth";
import "./SingleDayView.css";

export default function SingleDayView() {
    const params = useParams()
    const year = params.year
    const month = params.month
    const day = params.day
    const navigate = useNavigate()
    const date = moment().year(parseInt(year || "2023")).month(parseInt(month || "1") - 1).date(parseInt(day || "1"));
    const user = useAuth(true)

    function handleLeftButton() {
        date.subtract(1, "d")
        navigate(`/tasks/${date.year()}/${date.month() + 1}/${date.date()}`)
    }

    function handleRightButton() {
        date.add(1, "d")
        navigate(`/tasks/${date.year()}/${date.month() + 1}/${date.date()}`)
    }

    return !user ? null : (
        <Layout>
            <div>
                <button onClick={handleLeftButton}>◀️</button>
                <button onClick={handleRightButton}>▶️</button>
            </div>
            <div className={"single-day-gallery"}>
                <DayGallery year={year || "2023"} month={month || "03"} day={day || "2"} user={user}/>
            </div>
        </Layout>
    )
}