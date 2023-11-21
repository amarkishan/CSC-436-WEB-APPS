import { useContext, useState, useEffect } from "react";
import { StateContext } from "./context";
import { useResource } from "react-request-hook";

export default function CreateTodo() {
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const handleTitle = (e) => { setTitle(e.target.value) };
  const handleContent = (e) => setdescription(e.target.value);

  const [todo, createTodo] = useResource(({ title, description, completed, datecreated, datecompleted }) => ({
    url: "/todo",
    method: "post",
    data: { title, description, completed, datecreated, datecompleted },
    headers: { Authorization: `${state.user.access_token}` },
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      title,
      description,
      author: user.username,
      completed: false,
      datecreated: new Date(Date.now()).toLocaleString(),
      datecompleted: new Date(Date.now()).toLocaleString(),
    };
    createTodo(newTodo);
  };

  useEffect(() => {
    if (todo.isLoading === false && todo.data) {
      dispatch({ type: "CREATE_TODO", ...todo.data });
    }
  }, [todo]);

  // Reset form fields after submission
  useEffect(() => {
    setTitle('');
    setdescription('');
  }, [todo.isLoading]);

  return (
    <form onSubmit={handleSubmit}>
      <div>Author: {user.username}</div>
      <div>
        <label htmlFor="todo-title">Title:</label>
        <input type="text" name="todo-title" id="todo-title" value={title} onChange={handleTitle} />
      </div>
      <div>
        <label htmlFor="todo-content">Description:</label>
        <input type="text" name="todo-content" id="todo-content" value={description} onChange={handleContent} />
      </div>
      <input type="submit" value="Add Todo" disabled={title.length === 0 || description.length === 0} />
    </form>
  );
}
