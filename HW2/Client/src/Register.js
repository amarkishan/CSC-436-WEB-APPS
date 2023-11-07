import { useEffect, useState } from "react"
import App from "./App"
import { useResource } from "react-request-hook";
export default function Register({dispatch})
{
    const [user, register] = useResource((username, password) => ({
        url: "/users",
        method: "post",
        data: { email: username, password },
    }));

    useEffect(() => {
        if (user && user.data) {
            dispatch({ type: "REGISTER", username: user.data.email });
        }
        // You might want to handle errors here as well.
    }, [user, dispatch]);
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [passwordrepeat,setPasswordrepeat] =useState('')
    const handleUsername = (e) => {setUsername(e.target.value)}
    const handlePassword = (e) => {setPassword(e.target.value)}

    return(
        <form onSubmit={e=>{e.preventDefault(); register(username,password);}}>
            <label htmlFor="register-username">Username:</label>
            <input type="text" name="register-username" id="register-username" value={username} onChange={handleUsername}/>
            <label htmlFor="login-password">Password:</label>
            <input type="Password" name="login-password" id="login-password" value={password} onChange={handlePassword}/>
            <label htmlFor="register-password-repeat" >Repeat Password:</label>
            <input type="Password" name="register-password-repeat" id="register-password-repeat" value={passwordrepeat} onChange={(e) =>setPasswordrepeat(e.target.value)}/>
            <input type="submit" value="Register" disabled={username.length === 0 || password.length ===0 || password !== passwordrepeat}/>
            


        </form>
    )
}