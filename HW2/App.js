import Userbar from './Userbar';
import Todolist from './Todolist';
import Createtodo from './Createtodo';
import { useReducer } from "react";
import './style.css';
import { v4 as uuidv4 } from 'uuid';
function App() 
{
 
   
  const initialtodos = [
    {id:uuidv4(),title:"Buy groceries", description:"Milk, Bread, Eggs", author:"John Doe", completed:false ,datecreated:"04/10/2023" ,datecompleted:""},
    {id:uuidv4(),title:"Attend gym", description:"Leg day workout at 5pm", author:"Jane Smith", completed:false,datecreated:"04/09/2023",datecompleted:""},
    {id:uuidv4(),title:"Finish React project",description:"Implement final features and deploy",author:"Alice Johnson",completed:false,datecreated:"04/09/2023",datecompleted:""}]
  

  
    function Test(state, action) 
    {
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
    function TodoReducer(state, action) {
      switch (action.type) {
          case "CREATE_TODO":
              const newtodo = {
                  id: action.id,
                  title: action.title,
                  description: action.description,
                  author: action.author,
              };
              return [newtodo, ...state];
  
          case "DELETE_TODO":
              return state.filter(k => k.id !== action.id);
  
          case "TOGGLE_TODO":
              return state.map(k => {
                  if (k.id === action.id) {
                      const upadtecompletedstatus = !k.completed;
                      return {
                          ...k,
                          completed: upadtecompletedstatus,
                          datecompleted: upadtecompletedstatus ? new Date(Date.now()).toLocaleString() : ""
                      };
                  }
                  return k;
              });
  
          default:
              return state;
      }
  }
  
  
    const [user, dispatchuser] = useReducer(Test, "");
    const [todos, todosdispatcher] = useReducer(TodoReducer, initialtodos);
    
    const handleaddtodo = (newtodo) => 
    {
      
      todosdispatcher({type:"CREATE_TODO", ...newtodo});
      
    }
  return (
    <div>
      
       
       <Userbar user={user} dispatchuser={dispatchuser}/>

       { user?<Createtodo user={user} handleaddtodo={handleaddtodo} todos={todos} />:null}
       <Todolist todos={todos} dispatch={todosdispatcher}/>
       
    </div>
  );
}

export default App;
