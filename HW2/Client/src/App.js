import Userbar from './Userbar';
import Todolist from './Todolist';
import Createtodo from './Createtodo';
import { useEffect, useReducer } from "react";
import './style.css';
import { StateContext } from './context';
import appReducer from './reducer';
import { useResource } from 'react-request-hook';
function App() 
{
 
  const [todoresponse,gettodos] = useResource(() => ({
    url:"/todos",
    method:"get",
  }));  

  useEffect(gettodos,[]);
  useEffect(() =>
  {
    if(todoresponse && todoresponse.data)
    {
      dispatch({type:"FETCH_TODOS",todos:todoresponse.data});
    }
  },[todoresponse]);
  

    const [state, dispatch] = useReducer(appReducer, {
      user: "",
      todos: [],
    });
    
    const {user} = state;

    // const handleaddtodo = (newtodo) => 
    // {
      
    //   dispatch({type:"CREATE_TODO", ...newtodo});
      
    // }
  return (
    <div>
      
      <StateContext.Provider value={{ state, dispatch }}>
        <Userbar/>
        {user?<Createtodo/>:null}
        <Todolist/>
      </StateContext.Provider>
       
       
    </div>
  );
}

export default App;
