import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import axios from "axios"
import './SinglePollPage.css';
import { apiUrl } from '../../utils/Constants';



const SinglePollPage = () => {
  const [poll, setpoll] = useState({})
    const url = useParams()
    console.log(url)
    const getPoll =async()=>{
      const response = await axios.get(`
      ${apiUrl}polls/${url.id}`
      )
      // url.id (unique Id URL)
        console.log(response)
         setpoll(response.data)
    }
    useEffect(()=>{
        getPoll()
    },[])
    useEffect(()=>{console.log(poll)},[poll] )
 
  return (
    <div>
{poll && 
    <div className="poll-card">
    <h2>{poll?.topic}</h2>
    <ul>
      {poll?.choices?.map((option, index) => (
        <li key={index}>
     {option}
        </li>
      ))}
    </ul>
    <div className="button-container">
      <button className="share-button">Submit</button>
      <button className="comment-button">Leave Comment</button>
    </div>
  </div>
}</div>
);
};

    

export default SinglePollPage
