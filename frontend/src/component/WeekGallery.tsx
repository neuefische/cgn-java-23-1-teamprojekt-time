import moment from "moment";
import DayGallery from "./DayGallery";
import {useParams} from "react-router-dom";
import './WeekGallery.css';

export default function WeekGallery(){

    const params=useParams()
    const year = params.year
    const week = params.week
    const date = moment(`${year}/${week}/1`, "YYYY/W/E");
    const daysGallery=[]

    for(let i=0;i<7;i++){
        daysGallery.push(<DayGallery key={i} year={date.year().toString()} month={(date.month()+1).toString()} day={date.date().toString()}/>)
        date.add(1, 'd')
    }

    return (
        <>
            <h2> Week {year}/{week}</h2>
            <section className={"weekGallery"}>
                {daysGallery}
            </section>
        </>
    )

}