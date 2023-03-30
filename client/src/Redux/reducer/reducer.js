import { GET_ALL_DOGS, GET_ALL_TEMPS, GET_DOG_BY_ID, GET_DOG_BY_NAME, CREATE_DOG } from '../types';

// Seteamos el estado inicial del reducer
const initialState = {
    allDogs: {},
    allTemps: {},
    createdDogs: {},
}

// Seteamos el reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DOGS:
            return state;

        case GET_ALL_TEMPS:
            return state;

        case GET_DOG_BY_ID:
            return state;

        case GET_DOG_BY_NAME:
            return state;

        case CREATE_DOG:
            return state;

        default:
            return state;
    }
}