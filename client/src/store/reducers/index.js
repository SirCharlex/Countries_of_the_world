import * as myConstant from '../constants.js'

const initialState ={
    worldState: [],
    activitiesState: [],
    // detailState: [],
};

const rootReducer = (state = initialState, action)=>{

    switch (action.type){
        case myConstant.GET_COUNTRIES:
            return{
                ...state,
                worldState: action.payload,
            };
            

        case myConstant.GET_ACTIVITIES:
            return{
                ...state,
                activitiesState: action.payload,
            };
        // case myConstant.GET_COUNTRY_DETAIL:
        //     return{
        //         ...state,
        //         detailState: action.payload,
        //     };
        // case myConstant.ADD_ACTIVITY:
        //     return{
        //         ...state,
        //         detailState: state.detailState.concat(action.payload),
        //     };
        default: return {
            ...state
        }
    };
};

export default rootReducer