import {LOGIN, SET_USER} from "../actions/auth";

const initialState = {
    userId:"",
    token:"",
};


export default (state=initialState,actions)=>{
    switch (actions.type) {
        case SET_USER:
            return{
                userId: actions.userId,
                token:actions.token,
            }
        case LOGIN:
            return{
                userId: actions.userId,
                token:actions.token,
            }
    }
    return state;
}
