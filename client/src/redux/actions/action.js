// actions.js
import { apiUrl } from "../../utils/Constants";
export const increment = () => ({
    type: 'INCREMENT',
  });
  
  export const decrement = () => ({
    type: 'DECREMENT',
  });

  export const getChallenges=()=>async(dispatch)=>{
    
      try {
        const response = await fetch(apiUrl);
        // console.log(response.json())
        const jsonData = await response.json();

        console.log("RESPONCE IN STORE",jsonData);
        dispatch({
          type:"GET_CHALLENGES",
          payload: jsonData
        })
      } catch (error) {
        console.error("ERROR_IN STORE:", error);
      }
  }