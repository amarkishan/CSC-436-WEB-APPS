import { useContext } from "react";
import { useState } from "react";
import { StateContext } from "./context";
import { useResource } from "react-request-hook";

export default function CreateTodo() {
    const [title, setTitle] = useState('');
    const [description, setdescription] = useState('');
    const {state,dispatch}= useContext(StateContext);
    const {user} = state;
    const handleTitle = (e) => {setTitle(e.target.value)};
    const handleContent = (e) => setdescription(e.target.value);
    const [todo, CreateTodo] = useResource(({ title,description, author,completed,datecreated,datecompleted }) => ({
        url: "/todos",
        method: "post",
        data: { title,description,author,completed,datecreated,datecompleted },
    }));

    const handleSubmit = (e) => {
       
        e.preventDefault();
        const newTodo = {
            
            title,
            description,
            author: user,
            completed: false,
            datecreated: new Date(Date.now()).toLocaleString(),
            datecompleted:new Date(Date.now()).toLocaleString()
        };
        CreateTodo(newTodo);
        //handleaddtodo(newTodo);
        dispatch({type:"CREATE_TODO", ...newTodo});
        setTitle('');
        setdescription('');
        
        
    
      
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
            <input type="submit" value="Add Todo" disabled={title.length===0 || description.length===0 }/>
        </form>
    )
}
