import {useParams} from "react-router-dom";
import DayGallery from "./DayGallery";

export default function SingleDayView(){
    const params = useParams()
    const year = params.year
    const month = params.month
    const day = params.day

    return(
        <>
          <DayGallery year={year||"2023"} month={month||"03"} day={day||"2"}/>

        </>

    )

}