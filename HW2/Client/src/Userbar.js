import App from "./App";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { StateContext } from "./context";
import { useContext } from "react";
export default function UserBar()
{
    const { state, dispatch } = useContext(StateContext);
    const {user} = state;

    if(user)
    {
        return <Logout/>
    }
    else
    {
        return(
            <div>
                <Login dispatch={dispatch}/>
                <Register/> 
            </div>
        )
    }
}