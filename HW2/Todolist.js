import Todo from './Todo';

export default function Todolist({todos,dispatch})
{
    return(
        
            <div>
            { 
              todos.map((t) => (
                <div key={t.id}>
                    <Todo {...t} dispatch={dispatch}/>
                    <button onClick={(e) => {
                        dispatch({type:"DELETE_TODO", id: t.id})}}>Delete</button>
               </div>))
            }    
            </div>
        )
}