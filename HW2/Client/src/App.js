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
 
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  const { user, todos } = state;

  // const [theme, setTheme] = useState({
  //   primaryColor: "orange",
  //   secondaryColor: "purple",
  // });

   const [todoResponse, gettodos] = useResource(() => ({

     url: "/todo",
     method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
  }));

  useEffect(() => {
    gettodos();
  }, [state?.user?.access_token]);
  useEffect(() => {
    if (
      todoResponse &&
      todoResponse.isLoading === false &&
      todoResponse.data
    ) {
      dispatch({
        type: "FETCH_TODOS",
        todos: todoResponse.data.reverse(),
      });
    }
  }, [todoResponse]);

  useEffect(() => {
    if (user) {
      document.title = `${user.username}’s Blog`;
    } else {
      document.title = "Blog";
    }
  }, [user]);

  

  return (
    <div>
      
      <StateContext.Provider value={{ state, dispatch }}>
        <Userbar/>
        <Createtodo/>
        <Todolist/>
      </StateContext.Provider>
       
       
    </div>
  );
}

export default App;
