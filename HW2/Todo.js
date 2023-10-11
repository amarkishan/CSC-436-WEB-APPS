import { useState } from "react";

function Todo({ title, description, author, completed: initialCompleted, datecreated, datecompleted: initialDateCompleted }) {
    const [completed, setCompleted] = useState(initialCompleted || false);
    const [datecompleted, setDateCompleted] = useState(initialDateCompleted || '');

    
    const [dateCreated] = useState(datecreated || new Date(Date.now()).toLocaleString());

    const handleCheckboxChange = () => {
        setCompleted(!completed); 
        if (!completed) {
            setDateCompleted(new Date(Date.now()).toLocaleString());
        } else {
            setDateCompleted('');
        }
    };

    return (
        <div>
            <h1>{title}</h1>
            <div>{description}</div>
            <i>Written by: {author}</i>
            <div>Created on: {dateCreated}</div>

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
