import App from "./App";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

export default function UserBar({user,dispatchuser})
{
    
    if(user)
    {
        return <Logout user={user} dispatchuser={dispatchuser}/>
    }
    else
    {
        return(
            <div>
                <Login dispatchuser={dispatchuser}/>
                <Register dispacthuser={dispatchuser}/> 
            </div>
        )
    }
}