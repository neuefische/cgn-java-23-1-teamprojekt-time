import moment from "moment";
import DayGallery from "./DayGallery";
import {useNavigate, useParams} from "react-router-dom";
import './WeekGallery.css';

export default function WeekGallery(){

    const params=useParams()
    const year = params.year
    const week = params.week
   // const date = moment(`${year}/${week}/1`, "gggg/w/E");
    const date = moment({year :parseInt(year|| "2023")});
    date.week(parseInt(week || "1"))
    console.log(date)
    const daysGallery=[]
    const navigate = useNavigate()

    for(let i=0;i<7;i++){
        daysGallery.push(<DayGallery key={i} year={date.year().toString()} month={(date.month()+1).toString()} day={date.date().toString()}/>)
        date.add(1, 'd')
    }

    date.subtract(7,"d")

    function handleLeftButton(){
        date.subtract(1,"w")
        navigate(`/tasks/${date.year()}/week/${date.week()}`)
    }

    function handleRightButton(){
        date.add(1,"w")
        navigate(`/tasks/${date.year()}/week/${date.week()}`)
    }

    return (
        <>
            <h2> Week {year}/{week}</h2>
            <button onClick={handleLeftButton}>◀️</button>
            <button onClick={handleRightButton}>▶️</button>
            <section className={"weekGallery"}>
                {daysGallery}
            </section>
        </>
    )

}