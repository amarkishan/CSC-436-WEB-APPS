import { type } from "@testing-library/user-event/dist/type";
import App from "./App";
import { useContext } from "react";
import { StateContext } from "./context"; 
function Logout()
{
    const { state, dispatch } = useContext(StateContext);
    const { user } = state;
    const handleClick=(e)=>
    {
        dispatch({type:"LOGOUT"})
    }
    return(
     <form>
        Logged in as: <b>{user.username}</b>
        <input type="submit" value="logout" onClick={handleClick}/>
    </form>        

    )
}
export default Logout;  