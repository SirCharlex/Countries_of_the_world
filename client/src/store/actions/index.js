import * as myConstant from '../constants.js'
import { WORLD_URL, ACTIVITIES_URL } from '../../constants.js'
import axios from 'axios'

// export function getCountries2(){
//     return function(dispatch){
//         return axios.get(WORLD_URL)
//         .then((response)=>{
//             dispatch({
//                 type: 'GET_COUNTRIES',
//                 payload: response.data
//             })
//         })
//     }   
// }

export function getCountries(){
    return function(dispatch){
        return fetch(WORLD_URL)
        .then(response => response.json())
        .then(ctry => {
            // console.log('fetch result on Actions')
            // console.log(ctry)
            dispatch({
                type: myConstant.GET_COUNTRIES,
                payload: ctry
            });
        });
    };
};
 
export function getActivities(){
    return function(dispatch){
        return fetch(ACTIVITIES_URL)
        .then(response => response.json())
        .then(actv => {
            dispatch({
                type: myConstant.GET_ACTIVITIES,
                payload: actv,
            });
        });
    };
};

// export function getDeatail(alpha){
//     return function(dispatch){
//         return fetch(WORLD_URL + '/' + alpha)
//         .then(response => response.json())
//         .then(det => {
//             dispatch({
//                 type: myConstant.GET_COUNTRY_DETAIL,
//                 payload: det,
//             });
//         });
//     };
// };

// export function addActivity(payload){
//     const request = {
//         method: 'POST',
//         body: JSON.stringify(payload), 
//         headers:{'Content-Type': 'application/json'}
//     };
//     // console.log(payload);
//     return function(dispatch){
//         // console.log(dispatch);
//         return fetch(ACTIVITIES_URL, request)
//         .catch(error => console.error('Error:', error))
//         .then(res => res.json())
//         .then(activity =>{
//             // console.log(activity);
//             dispatch({
//                 type: myConstant.ADD_ACTIVITY,
//                 payload: activity,
//             });
//         });
//     };
// };
