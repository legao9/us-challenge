// Product.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TodoList from "../../components/TodoList/TodoList";
import './Challenge.css'
import {apiUrl} from '../../utils/Constants';
import 'bootstrap/dist/css/bootstrap.min.css';


const Challenge = ({ match }) => {
  const [challenge, setChallenge] = useState(null);
  const { challengeId } = useParams();


  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await fetch(
          `${apiUrl}challenge/${challengeId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`);
        }

        const challengeData = await response.json();
        setChallenge(challengeData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChallenge();
  }, [challengeId]);

  return (
    <div>
      {challenge ? (
        <div className= "container"> 
        <div className="challenge card">
          <h1 className="challenge-name">{challenge.challengeName} 🍎
          </h1>
          <p className="challenge-description">{challenge.description}</p>
          <p>
            {challenge.faqs?.map((faq) => (
              <span>{faq} |</span>
            ))}
          </p>
          <p>
            {challenge.tags?.map((tag) => (
              <span>{tag} </span>
            ))}
          </p>
          <ul>
            {challenge.rules?.map((rule) => (
              <li>{rule} |</li>
            ))}
          </ul>
          <p>
           <TodoList todos={challenge.todos} />
            
          </p>
        </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Challenge;
