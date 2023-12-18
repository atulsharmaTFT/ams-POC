import classes from './DashboardCards.module.scss'
import {FcAndroidOs} from "react-icons/fc"
import {AiFillApple} from "react-icons/ai"
import {FaWindows,FaMobileAlt} from "react-icons/fa"
export const DashboardCards = ({data})=>{
    
    function renderIcon(){
        switch (data?.icon) {
            case "FcAndroidOs":
                return <FcAndroidOs size={"30px"}/>
                // break;
            case "AiFillApple":
                return <AiFillApple size={"30px"} color={data?.iconColor} />
            // break;
            case "FaWindows":
                return <FaWindows size={"30px"} color={data?.iconColor}/>
            // break;
            case "FaMobileAlt":
                return <FaMobileAlt size={"30px"} color={data?.iconColor}/>
            // break;
            default:
                return
                // break;
        }
    }
    return(
        <div className={classes.dashboardCard} style={{backgroundColor:data?.color, boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.289)"}}>
            <div className={classes.icon}>
            {renderIcon()}
            </div>
            <div className={classes.data}>
            <h1>{data.count}</h1>
            <p>{data.description}</p>
            </div>
        </div>
    )
}