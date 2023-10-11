import Userbar from './Userbar';
import Todolist from './Todolist';
import Createtodo from './Createtodo';
import { useState,useReducer } from "react";
import './style.css';
function App() 
{
 
  //const [user,setuser]=useState('')  
  const initialtodos = [
    {title:"Buy groceries", description:"Milk, Bread, Eggs", author:"John Doe", completed:false ,datecreated:"04/10/2023" ,datecompleted:""},
    {title:"Attend gym", description:"Leg day workout at 5pm", author:"Jane Smith", completed:false,datecreated:"04/09/2023",datecompleted:""},
    {title:"Finish React project",description:"Implement final features and deploy",author:"Alice Johnson",completed:false,datecreated:"04/09/2023",datecompleted:""}]
  const[todos,settodos] = useState(initialtodos)

  
    function Test(state, action) {
      switch (action.type) {
        case "LOGIN":
        case "REGISTER":
          return action.username;
        case "LOGOUT":
          return "";
        default:
          return state;
      }
    }
  
    const [user, dispatchuser] = useReducer(Test, "");

  return (
    <div>
      
       
       <Userbar user={user} dispatchuser={dispatchuser}/>
       <Createtodo user={user} settodos={settodos} todos={todos} />
       <Todolist todos={todos}/>
       
    </div>
  );
}

export default App;
