import { GET_ALL_DOGS, GET_ALL_TEMPS, GET_DOG_BY_ID, GET_DOG_BY_NAME, CREATE_DOG, ORDER_DOGS, FILTER_DOGS } from '../types';

// Seteamos el estado inicial del reducer
const initialState = {
    allDogs: [],
    allTemps: [],
    createdDogs: [],
    detailDog: {},
    searchDogs: [],
}

// Seteamos el reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                allDogs: action.payload,
            };

        case GET_ALL_TEMPS:
            return {
                ...state,
                allTemps: action.payload,
            };

        case GET_DOG_BY_ID:
            return {
                ...state,
                detailDog: action.payload,
            };

        case GET_DOG_BY_NAME:
            return {
                ...state,
                searchDogs: action.payload,
            };

        case CREATE_DOG:
            return {
                ...state,
                createdDogs: action.payload,
            };

        case ORDER_DOGS:
            let orderedDogs = [...state.allDogs];
            if (action.payload === "Ascendente") {
                orderedDogs.sort((a, b) => a.name.localeCompare(b.name));
            }
            else if (action.payload === "Descendente") {
                orderedDogs.sort((a, b) => b.name.localeCompare(a.name));
            }
            return {
                ...state,
                allDogs: orderedDogs,
            };

        case FILTER_DOGS:
            return {
                ...state,

            };

        default:
            return state;
    }
}