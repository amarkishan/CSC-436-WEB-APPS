import { useState } from "react";

export default function CreateTodo({ user,handleaddtodo, todos }) {
    const [title, setTitle] = useState('');
    const [description, setdescription] = useState('');

    const handleTitle = (e) => setTitle(e.target.value);
    const handleContent = (e) => setdescription(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTodo = {
            title,
            description,
            author: user,
            completed: false,
            dateCreated: new Date(Date.now()).toLocaleString(),
            datecompleted:new Date(Date.now()).toLocaleString()
        };
        handleaddtodo(newTodo);
        
    
      
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>Author: {user}</div>
            <div>
                <label htmlFor="todo-title">Title:</label>
                <input type="text" name="todo-title" id="todo-title" value={title} onChange={handleTitle} />
            </div>
            <div>
                <label htmlFor="todo-content">description:</label>
                <input type="text" name="todo-content" id="todo-content" value={description} onChange={handleContent} />
            </div>
            <input type="submit" value="Add Todo" disabled={title.length===0 || description.length===0 || !user}/>
        </form>
    )
}
