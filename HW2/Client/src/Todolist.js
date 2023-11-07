import { useContext, useEffect } from 'react';
import Todo from './Todo';
import { StateContext } from './context';
import { useResource } from 'react-request-hook';

export default function TodoList() {
  const { state, dispatch } = useContext(StateContext);
  const { todos } = state;
  const [todoToDelete, deleteTodo] = useResource(({ id }) => ({
    url: `/todos/${id}`,
    method: 'delete',
  }));

  const handleDelete = (id) => {
    deleteTodo({ id });
    
  };
  //console.log(todoToDelete.data.id)

  useEffect(() => {
    
    if (todoToDelete.isLoading === false && todoToDelete.error === null) {
      
      if (todoToDelete.data && todoToDelete.data.id) {
        dispatch({ type: "DELETE_TODO", id: todoToDelete.data.id });
      } else {
        
      }
    }
  }, [todoToDelete, dispatch]);
  

  return (
    <div>
      {todos.map((t) => (
        <div key={t.id}>
          <Todo {...t} dispatch={dispatch} />
          <button onClick={(e) => handleDelete(t.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
