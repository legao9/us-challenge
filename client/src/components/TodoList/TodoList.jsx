// TodoList.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TodoList.css"
import {apiUrl} from '../../utils/Constants';
import 'bootstrap/dist/css/bootstrap.min.css';


const TodoList = ({ todos, toggleTodo }) => {
  const {challengeId} = useParams()
    const [checkTodo, setCheckedTodo] = useState(false)
    const [todoArray, setTodoArray] = useState(todos)
    const [checkBox, setCheckBox] = ([])
    const updateTodos = (e)=>{
     // console.log("__TODO__",e)
      let newArr = todoArray.filter((item)=> item.task == e.task)

      let restOfArr = todoArray.filter((item)=> item.task !== e.task)
      // newArr[0]?.checkedBy = [...newArr[0]?.checkedBy,{email:localStorage.getItem("email")}];
      console.log("NEW ARRAY",newArr)
            
      setTodoArray([...restOfArr, newArr[0]])
      console.log(e,"ONLCIKC", newArr)
    }
    useEffect(()=>{
      console.log(todoArray,"____USEEFECT")
    },[todoArray])
    const submitChallenge= async()=>{
      //Here passing checked todo list to AI and then through backend will subimt this to the DB 
      try{
        const response = axios.post(apiUrl+"challenge/updateTodo", {challengeId, todoArray, email: localStorage.getItem("email"),userId: localStorage.getItem("id")})
      console.log(response)
   //   setTodoArray(response)
      }catch(e){
        console.log(e, "ERROR")
      }
    }
    useEffect(() => {
      console.log(challengeId,"___CHALLENGE_ID___")
      console.log(todoArray)

    }, [todoArray])

    useEffect(()=>{
     async function getTodoList(){

        const response  = await axios.get(`${apiUrl}todolist/get/${challengeId}`)
        console.log("RESPONSE",response.data.response)
        setTodoArray(response.data.response.task)
        //you there? Ok So for today i did changes:  setting challenges and todolist separatly, 
        //This will also help to change styls or update to done on frontend, however there are many benfits of this thing.
        //So can i just leave for today? SUre is it still giving errors?
        //no its working fine Yeah working fine which page is working ? 
      }
      getTodoList()
    },[])

  return (
    <div className="container">
      <div className="row">
      {todoArray.map((todo) => (
<div className="col-md-12 col-sm-12 col-xs-12">
  <div className="d-grip gap-2">
<button type="button" class="btn btn-outline-primary">
{todo.task} <span class="badge text-bg-secondary">{todo.points}</span>

</button>
</div>
     </div>
      ))}
      <div class="col-md-12">
      <button class="btn btn-outline-primary" onClick={()=> submitChallenge()} style={{backgroundColor:"green", color:"white"}}>Submit</button>
      </div>
      </div>
    </div>
  );
};

export default TodoList;
