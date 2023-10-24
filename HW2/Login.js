import { useState } from "react";
import App from "./App";
function Login({dispatchuser})
{
    const [username,setUsername] =useState('')
    const handleUsername=(e) =>
    {
       setUsername(e.target.value)
    }
    return(
        <form onSubmit={e => { e.preventDefault(); 
        dispatchuser({type:"LOGIN",username}); }}>
            <label htmlFor="login-username">Username:</label>
            <input type="text" name="login-username" id="login-username" value={username} onChange={handleUsername}/>
            <label htmlFor="login-password">Password:</label>
            <input type="text" name="login-password" id="login-password"/>
            <input type="submit" value="Login"  disabled={username.length===0}/>
        </form>
    )
}
export default Login;