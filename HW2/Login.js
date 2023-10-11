import { useState } from "react";

function Login({setuser})
{
    const [username,setUsername] =useState('')
    const handleUsername=(e) =>
    {
       setUsername(e.target.value)
    }
    return(
        <form onSubmit={e => { e.preventDefault(); setuser(username);}}>
            <label htmlFor="login-username">Username:</label>
            <input type="text" name="login-username" id="login-username" value={username} onChange={handleUsername}/>
            <label htmlFor="login-password">Password:</label>
            <input type="text" name="login-password" id="login-password"/>
            <input type="submit" value="Login"  disabled={username.length===0}/>
        </form>
    )
}
export default Login;