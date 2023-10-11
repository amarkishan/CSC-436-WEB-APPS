import Userbar from './Userbar';
import Todolist from './Todolist';
import Createtodo from './Createtodo';
import { useState } from "react";
import './style.css';
function App() 
{
 
  const [user,setuser]=useState('')  
  const initialtodos = [
    {title:"Buy groceries", description:"Milk, Bread, Eggs", author:"John Doe", completed:false ,datecreated:"04/10/2023" ,datecompleted:""},
    {title:"Attend gym", description:"Leg day workout at 5pm", author:"Jane Smith", completed:true,datecreated:"04/09/2023",datecompleted:""},
    {title:"Finish React project",description:"Implement final features and deploy",author:"Alice Johnson",completed:false,datecreated:"04/09/2023",datecompleted:""}]
  const[todos,settodos] = useState(initialtodos)

  
    

  return (
    <div>
      
       
       <Userbar user={user} setuser={setuser}/>
       <Createtodo user={user} settodos={settodos} todos={todos} />
       <Todolist todos={todos}/>
       
    </div>
  );
}

export default App;
