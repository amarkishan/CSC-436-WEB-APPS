import { useContext, useEffect } from 'react';
import Todo from './Todo';
import { StateContext } from './context';
import { useResource } from 'react-request-hook';

export default function TodoList() {
  const { state, dispatch } = useContext(StateContext);
  const { todos } = state;
  const [todoToDelete, deleteTodo] = useResource(({ id }) => ({
    url: `/todo/${id}`,
    method: 'delete',
    headers: { Authorization: `${state.user.access_token}` },
  }));

  const handleDelete = (id) => {
    console.log('Deleting todo with ID:', id);
    deleteTodo({ id });
  };

  useEffect(() => {
    if (todoToDelete.isLoading === false) {
      if (todoToDelete.error) {
        console.error('Error deleting todo:', todoToDelete.error);
      } else if (todoToDelete.data && todoToDelete.data.id) {
        dispatch({ type: 'DELETE_TODO', id: todoToDelete.data.id });
      }
    }
  }, [todoToDelete, dispatch]);

  return (
    <div>
      {todos.length === 0 ? (
        <h2>No todos found.</h2>
      ) : (
        todos.map((t) => (
          <div key={t._id}>
            {/* Log the todo content here */}
            {console.log('Todo content:', t)}
            
            <Todo 
            id={t._id}
            title={t.title}
            description={t.description}
            author={t.author}
            completed={t.completed}
            datecreated={t.datecreated}
            datecompleted={t.datecompleted}
            dispatch={dispatch}/>
            <button onClick={(e) => handleDelete(t._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
