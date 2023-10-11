function Logout({user,setuser})
{
    const handleClick=(e)=>
    {
        setuser('')
    }
    return(
     <form>
        Logged in as: <b>{user}</b>
        <input type="submit" value="logout" onClick={handleClick}/>
    </form>        

    )
}
export default Logout;  