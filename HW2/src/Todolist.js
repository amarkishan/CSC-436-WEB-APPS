import Todo from './Todo';
import { v4 as uuidv4 } from 'uuid';
export default function Todolist({todos})
{
    return(
        
            <div>
            
                { 
                    todos.map((t,i) => (<Todo {...t} key={uuidv4()} />)) 
                }    
            
            </div>
        
    )
}