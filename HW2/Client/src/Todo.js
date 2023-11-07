import { useState } from "react";
import { useResource } from "react-request-hook";
import { useEffect } from "react";

function Todo({id, title, description, author, completed, datecreated, datecompleted,dispatch }) {
    
    const [todoUpdate, updateTodoStatus] = useResource((todoId, completedStatus) => ({
        url: `/todos/${todoId}`,
        method: 'patch',
        data: { completed: completedStatus }
    }));

    const handleCheckboxChange = () => {
        updateTodoStatus(id, !completed);
    };
    useEffect(() => {
        if (todoUpdate.isLoading === false && todoUpdate.data && !todoUpdate.error) {
            dispatch({
                type: "TOGGLE_TODO",
                id: todoUpdate.data.id,
                completed: todoUpdate.data.completed
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
                        onChange={handleCheckboxChange}
                    />
                    Completed: {completed.toString()}
                </label>
            

            {completed && (<span style={{marginLeft:"10px"}}>Date Completed: {datecompleted}</span>)}
            </div>
        </div>
    );
}

export default Todo;
