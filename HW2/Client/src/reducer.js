function userReducer(state, action) 
{
  switch (action.type) {
    case "LOGIN":
      return{
        username:action.username,
        access_token:action.access_token
      };
    
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}
function TodoReducer(state, action) {
  switch (action.type) {

      case "FETCH_TODOS":
        return action.todos;
      case "CREATE_TODO":
          const newtodo = {
              id: action.id,
              title: action.title,
              description: action.description,
              author: action.author,
              completed: action.completed,
              datecreated: action.datecreated,
              datecompleted:action.toLocaleString()
          };
          return [newtodo, ...state];



        case "DELETE_TODO":

          return state.filter(todo => todo._id !== action.id);
          
        

      case "TOGGLE_TODO":
        return state.map(todo => {
            if (todo.id === action.id) {
                return {
                    ...todo,
                    completed: action.completed,
                    datecompleted: action.completed ? new Date().toLocaleString() : todo.datecompleted // Update the date if completed
                    };
                }
                
                return todo;
            });
        

      default:
          return state;
  }
}


export default function appreducer (state,action)
{
    return{
        user:userReducer(state.user,action),
        todos:TodoReducer(state.todos,action)
    };
}