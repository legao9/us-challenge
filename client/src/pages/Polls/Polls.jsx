import React, { useEffect, useState } from "react";
import useFetch from "../../utils/useFetch";
import "./Polls.css";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { FaShareFromSquare } from "react-icons/fa6";
import 'bootstrap/dist/css/bootstrap.min.css';
import {apiUrl} from '../../utils/Constants';

const Polls = () => {
  const [multipleChoiceVotes, setMultipleChoiceVotes] = useState([]);
  const [rankVotes, setRankVotes] = useState([]);
  const [polls, setPolls] = useState([]);
  const [answer, setanswer] = useState({});
  const navigate = useNavigate() 
  const handleMultipleChoiceChange = (option) => {
    const updatedVotes = [...multipleChoiceVotes];
    const index = updatedVotes.indexOf(option);
    console.log(option);
    if (index === -1) {
      updatedVotes.push(option);
    } else {
      updatedVotes.splice(index, 1);
    }

    setMultipleChoiceVotes(updatedVotes);
  };

  const handleRankChange = (option, rank) => {
    const updatedRanks = [...rankVotes];
    const existingIndex = updatedRanks.findIndex(
      (vote) => vote.option === option
    );

    if (existingIndex !== -1) {
      updatedRanks[existingIndex].rank = rank;
    } else {
      updatedRanks.push({ option, rank });
    }

    setRankVotes(updatedRanks);
  };

  // const submitPoll = ()=>{
  // useEffect(()=>{
  //   const { isLoading, serverError, apiData } = useFetch(
  //     "GET",
  //     "polls",
  //     {}
  //   );
  // }, [])

  // }\
  const copyUrl=(id)=>{
    navigator.clipboard.writeText(`${apiUrl}polls/${id}`)
  navigate(`/polls/${id}`)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}polls`);
        // console.log(response.json())
        const jsonData = await response.json();
          
        setPolls(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleSubmit = () => {
    console.log("Multiple Choice Votes:", multipleChoiceVotes);
    console.log("Rank Votes:", rankVotes);
  };
  const updatepoll = async (doc) => {
    let newDoc = doc;

    let tempAns = [];
    if(answer[doc._id]){
      Object.keys(answer[doc._id]).forEach(key=>{
        if(answer[doc._id][key]){
          tempAns.push(key);
        }
      });
    }
      console.log("READING DOC",doc, doc.answer)
    newDoc.answer.push(...newDoc?.answer,{answer:tempAns, email:localStorage.getItem("email")})
    console.log("UPDATED___",newDoc)
    const response = await axios.post(`${apiUrl}polls/updatepoll`, {
      newDoc
    });

    console.log("NEW DOC", newDoc);
    console.log(response)
  };
  const handleAnswer = (poll,tempAns)=>{
    let ans = answer;
    if(!ans){
      ans={};
    }
    if(ans[poll._id]){
      ans[poll._id][tempAns] = !ans[poll._id][tempAns];
    }else{
      ans[poll._id] = {};
      ans[poll._id][tempAns] =  !ans[poll._id][tempAns]; 
    }
    setanswer(ans);
  }
  const getCheckBox =(poll,option)=>{
    if(answer[poll._id] == undefined){
      return false;
    }
    if(answer[poll._id][option] == undefined){
      return false;
    }
    return answer[poll._id][option];

  }
  return (
    <div className="poll-container">
      {polls?.map((poll) => {
        return (
          <div>
          <div style={{display:"flex",alignItems:"center"}}>
            <h1>{poll.topic}</h1>
            <FaShareFromSquare onClick={()=> copyUrl(poll?._id)} style={{width:"30px",height:"30px",padding:"8px"}}/>
            </div>
            
            {poll?.choices.map((option) => (
              <div key={option} className="poll-quetions form-check">
               <p className={'form-check-input '}
                  type="checkbox"
                  onClick={() => handleAnswer(poll,option)}
                  checked={getCheckBox(poll,option)}
                >
                {option}
                </p>
               
              </div>
            ))}
            <button onClick={() => updatepoll(poll)}> Submit </button>
          </div>
        );
      })}
    </div>
  );
};

export default Polls;
