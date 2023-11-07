import { useEffect, useState } from "react";
import { useResource } from "react-request-hook";

function Login({ dispatch }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [user, login] = useResource((username, password) => ({
    url: "/login",
    method: "post",
    data: { email: username, password },
  }));

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (user?.data) {
      // Assuming that the server will return the email in the data if login is successful.
      dispatch({ type: "LOGIN", username: user.data.user.email });
      setLoginFailed(false);
    } else if (user?.error) {
      // Handle the login failure here.
      setLoginFailed(true);
    }
  }, [user, dispatch]);
  return (
    <>
      
      <form onSubmit={e => { e.preventDefault(); login(username, password); }}>
        <label htmlFor="login-username">Username:</label>
        <input 
          type="text" 
          name="login-username" 
          id="login-username" 
          value={username} 
          onChange={handleUsername} 
        />
        <label htmlFor="login-password">Password:</label>
        <input 
          type="password" 
          name="login-password" 
          id="login-password" 
          value={password} 
          onChange={handlePassword} 
        />
        <input 
          type="submit" 
          value="Login" 
          disabled={username.length === 0 || password.length === 0} 
        />
        {loginFailed && <span style={{ color: "red" }}>Invalid username or password</span>}
      </form>
    </>
  );
}

export default Login;
