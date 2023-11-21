import { useContext, useEffect } from 'react';
import { StateContext } from './context';
import { useResource } from 'react-request-hook';

export default function Todo({
  id,
  title,
  description,
  author,
  completed,
  datecreated,
  datecompleted,
  dispatch,
}) {
  const { state } = useContext(StateContext);
  const [todoUpdate, updateTodoStatus] = useResource(({ id }) => ({
    url: `/todo/${id}`,
    method: 'patch',
    headers: { Authorization: `${state.user.access_token}` },
  }));

  const handleCheckboxChange = (id) => {
    //console.log('Todo ID:', id); // Log the id value
    console.log('test');
    updateTodoStatus({ id }); // Pass the todo id to updateTodoStatus
  };
 
  useEffect(() => {
    console.log('Todo component re-rendered');
  }, [completed]);
  useEffect(() => {
    if (!todoUpdate.isLoading && todoUpdate.data && !todoUpdate.error) {
      dispatch({
        type: 'TOGGLE_TODO',
        id: todoUpdate.data.id,
        completed: todoUpdate.data.completed,
      });
    }

    if (todoUpdate.error) {
      console.error('Error updating todo status:', todoUpdate.error);
    }
  }, [todoUpdate, dispatch]);

  return (
    <div>
      <h1>{title}</h1>
      <div>{description}</div>
      <i>Written by: {author}</i>
      <div>Created on: {datecreated}</div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => handleCheckboxChange(id)}
          />
          Completed: {completed.toString()}
        </label>

        {completed && (
          <span style={{ marginLeft: '10px' }}>
            Date Completed: {datecompleted}
          </span>
        )}
      </div>
    </div>
  );
}
