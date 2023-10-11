import { type } from "@testing-library/user-event/dist/type";
import App from "./App";
function Logout({user,dispatchuser})
{
    const handleClick=(e)=>
    {
        dispatchuser({type:"LOGOUT"})
    }
    return(
     <form>
        Logged in as: <b>{user}</b>
        <input type="submit" value="logout" onClick={handleClick}/>
    </form>        

    )
}
export default Logout;  