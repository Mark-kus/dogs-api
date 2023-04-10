import {
    GET_ALL_DOGS,
    GET_ALL_TEMPS,
    GET_DOG_BY_ID,
    GET_DOG_BY_NAME,
    CREATE_DOG,
    ORDER_DOGS,
    FILTER_DOGS,
    PAGINATION
} from '../types';

// Seteamos el estado inicial del reducer
const initialState = {
    allDogs: [],
    orderedDogs: [],
    filteredDogs: [],
    allTemps: [],
    createdDogs: [],
    detailDog: {},
    searchDogs: [],
    currentPage: 1,
}

// Seteamos el reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DOGS:
            const created = action.payload.filter(dog => dog.created);
            return {
                ...state,
                allDogs: action.payload,
                filteredDogs: action.payload,
                orderedDogs: action.payload,
                createdDogs: created,
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
            const addDogCreated = [...state.createdDogs];
            const addDogAll = [...state.allDogs];
            addDogAll.push(action.payload);
            addDogCreated.push(action.payload);
            return {
                ...state,
                createdDogs: addDogCreated,
                allDogs: addDogAll,
            };

        case ORDER_DOGS:
            let orderedDogs =
                state.filteredDogs.length
                    ? [...filteredDogs]
                    : [...state.allDogs];
            if (action.payload === "Ascendente") {
                orderedDogs.sort((a, b) => a.name.localeCompare(b.name));
            }
            else if (action.payload === "Descendente") {
                orderedDogs.sort((a, b) => b.name.localeCompare(a.name));
            }
            return {
                ...state,
                filteredDogs: orderedDogs,
            };

        case FILTER_DOGS:
            let filteredDogs;

            if (action.payload.created === false) {
                if (action.payload.filter !== 'Show all') {
                    filteredDogs = state.allDogs.filter(dog => {
                        if (typeof dog.temperament === 'string') {
                            return dog.temperament.includes(action.payload.filter);
                        }
                    });
                }
                else {
                    filteredDogs = [...state.allDogs];
                }

            } else {
                if (action.payload.filter !== 'Show all') {
                    filteredDogs = state.createdDogs.filter(dog => {
                        if (typeof dog.temperament === 'string') {
                            return dog.temperament.includes(action.payload.filter);
                        }
                    });
                }
                else {
                    filteredDogs = [...state.createdDogs];
                }

            }
            return {
                ...state,
                filteredDogs: filteredDogs,
            };

        case PAGINATION:
            return {
                ...state,
                
            }

        default:
            return state;
    }
}