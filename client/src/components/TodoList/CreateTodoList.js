import React, {useEffect, useState} from 'react'
import axios from "axios"
import { useLocation, useParams } from 'react-router-dom';
import {apiUrl} from '../../utils/Constants';


const CreateTodoList = () => {
    const [todos, setTodos] = useState([]);
    const [todoTitle, setTodoTitle] = useState('');
    const pushTodos = () => {
        if(todoTitle){
    
          let todoId = Number(new Date())
          const newTodo = { task: todoTitle, checkedBy: [], id: todoId};
          setTodos((items) => [...items, newTodo]);
          setTodoTitle("")
        }
      };
    
      const deleteTodo =(id)=>{
        let filtered = todos.filter((item)=> item.id !==  id);
         setTodos(filtered) 
      }
      useEffect(()=>{
        console.log("todos___",todos)
      },[todos])

      const location = useLocation()
    //  console.log("PARAMS: ", location.state.challengeId)
    //now params are removed from console.yes,i thought you made changesOkay, so i will make it exact it was before or even better
      const submitChallenge = async ()=> {
const response = await axios.post(`${apiUrl}todolist/create`, {todos,challengeId: location?.state?.challengeId})
console.log(response)     
}
    return (
        <div className="container">
          <div className="form">
            <h1 className="">Create New Challenge</h1>
            
            <div className="input-div">
              <label htmlFor="todos">Duration</label>
              <input
                type="text"
                onChange={(e) => setTodoTitle(e.target.value)}
                value={todoTitle}
                className="form-control"
                name="todos"
                placeholder="todos"
              />
              <button onClick={() => pushTodos()}>Add+</button>
            </div>
            <div className="todo-list">
              
    
              {todos && todos.length > 0 ? (
                todos.map((item, index) => <div key={index} className='single-item'>
                  <p>
                  {index+1}. {item.task} 
                  </p>
                  <button onClick={()=> deleteTodo(item.id)}>delete</button>
                  </div>)
                ) : (
                  <p >
                  0 TODOs
                </p>
              )}
    
            </div>
            <button onClick={()=>submitChallenge()}>Submit To Do</button>
          </div>
        </div>
      );
    };
    

export default CreateTodoList
