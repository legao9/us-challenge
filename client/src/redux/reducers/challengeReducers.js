import { GET_CHALLENGES } from "../actions/actionTypes"

const initialState = {
    challenges:[]
}

const challengeReducer = (state=initialState, action )=>{
    switch(action.type){
        case GET_CHALLENGES:
           return {...state,
                challenges: action.payload
            }
            default:
                 return state
    }
}

export default challengeReducer

