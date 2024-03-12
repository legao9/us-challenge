import React, { useState } from "react";
import useFetch from "../../utils/useFetch";
import "./CreatePoll.css";
import {apiUrl} from '../../utils/Constants';


const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answersData, setAnswersData] = useState([]);
  const [pollType, setPollType] = useState("multipleChoice");

  // const { isLoading, serverError, apiData } = useFetch(
  //   "POST",
  //   "polls",
  // {
  //   topic: question,
  //   choices: answersData,
  //   type: pollType,
  // }
  // );

  const handlePostRequest = async () => {
    try {
      // setLoading(true);

      const response = await fetch(apiUrl+"polls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email:localStorage.getItem('email') ,
          topic: question,
          choices: answersData,
          type: pollType,
          answer:[]
        }),
      });

      const jsonResponse = await response.json();

      // Assuming your backend responds with a message
      // setResponseMessage(jsonResponse.message);
    } catch (error) {
      console.error("Error making POST request:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handlePollTypeChange = (e) => {
    setPollType(e.target.value);
  };

  const handleSubmit = () => {
    handlePostRequest();
  };

  return (
    <div className="create-poll-container">
      <h2>Create a New Poll</h2>
      <form>
        <div className="form-group">
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={handleQuestionChange}
            required
          />
          <label htmlFor="answer">Answer:</label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setAnswersData((prevArray) => [...prevArray, answer]);
              setAnswer("");
            }}
          >
            +
          </button>
          <ul>
            {answersData?.map((data) => {
              return <li>{data}</li>;
            })}
          </ul>
        </div>

        <div className="form-group">
          <label htmlFor="pollType">Poll Type:</label>
          <select
            id="pollType"
            onChange={handlePollTypeChange}
            value={pollType}
          >
            <option value="multipleChoice">Multiple Choice</option>
            <option value="rankVoting">Rank Voting</option>
          </select>
        </div>

        <button type="button" onClick={handleSubmit}>
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
