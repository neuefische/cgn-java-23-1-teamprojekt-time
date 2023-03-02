import "./Header.css"
import Navigation from "./Navigation";

export default function (){
    return(
        <header className={"header"}>
            <img className={"header_img"} src={"/logo_small.png"} alt={"logo"}/>
            <Navigation/>
        </header>
    )
}