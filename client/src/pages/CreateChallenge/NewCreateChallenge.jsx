import React,{useState, useEffect} from 'react'
import "./NewCreateChallenge.css"
import { useNavigate } from 'react-router-dom';
import {apiUrl} from '../../utils/Constants';


const NewCreateChallenge = () => {
  const navigate = useNavigate()
    const [cName, setChallengeName] = useState('');
    const [description, setDescription] = useState('');
    const [priceAmount, setPriceAmount] = useState(0);
    const [fromDate, setFromDate] = useState(new Date());
    const [duration, setDuration] = useState(null);
  
    const [toDate, setToDate] = useState(new Date());
    const [meetLink, setMeetLink] = useState('');
    const [howToPlay, setHowToPlay] = useState('');
    const [rules, setRules] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [todos, setTodos] = useState([]);
    const [todoTitle, setTodoTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [companyId, setCompanyId] = useState('');
    const [avatar, setAvatar] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [updatedAt, setUpdatedAt] = useState(new Date());
    const [joinCharge, setJoinCharge] = useState(0);
    const [winner, setWinner] = useState({});
    const [joiners, setJoiners] = useState([]);
  
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
    const submitChallenge = async () =>{
        const body = {challengeName:cName,
           priceamount: priceAmount,
            description,
            fromDate,
            duration}
            console.log(body)
       const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
       'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const challengeData = await response.json()

      console.log("JSON RESPONS",challengeData)
      if(challengeData.status == 200){
        navigate("/add-todo",{state:{challengeId:challengeData.data._id}})
      }
    }
  
    return (
      <div className="container">
        <div className="form">
          <h1 className="">Create New Challenge</h1>
          <div className="input-div">
            <lable for="challenge-name">Challenge Name</lable>
            <input
              type="text"
              className="form-control"
              name="challenge-name"
              placeholder="Challenge name..."
              onChange={(e)=> setChallengeName(e.target.value)}
              />
          </div>
  
          <div className="input-div">
            <lable for="challenge-description">Challenge Desrription</lable>
            <input
              type="text"
              className="form-control"
              name="challenge-description"
              placeholder="Challenge Description..."
            />
          </div>
  
          <div className="input-div">
            <label htmlFor="price-amount">Price Amount</label>
            <input
              type="number"
              onChange={(e) => setPriceAmount(Number(e.target.value))}
              value={priceAmount}
              className="form-control"
              name="price-amount"
              placeholder="Price amount..."
            />
          </div>
  
          {/* From Date */}
  
          <div className="input-div">
            <label htmlFor="from-end-date">Duration</label>
            <input
              type="number"
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
              className="form-control"
              name="from-end-date"
              placeholder="expires in after joine"
            />
          </div>
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
                {index+1}. {item.title} 
                </p>
                <button onClick={()=> deleteTodo(item.id)}>delete</button>
                </div>)
              ) : (
                <p >
                0 TODOs
              </p>
            )}
  
          </div>
          <button onClick={()=>submitChallenge()}>Submit Challenge</button>
        </div>
      </div>
    );
  };
  

export default NewCreateChallenge
