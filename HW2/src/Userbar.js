import App from "./App";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

export default function UserBar({user,setuser})
{
    
    if(user)
    {
        return <Logout user={user} setuser={setuser}/>
    }
    else
    {
        return(
            <div>
                <Login setuser={setuser}/>
                <Register setuser={setuser}/> 
            </div>
        )
    }
}