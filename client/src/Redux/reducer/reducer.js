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
    filteredDogs: [],
    shownDogs: [],
    allTemps: [],
    createdDogs: [],
    detailDog: {},
    searchDogs: [],
    currentPage: 1,
    itemsPerPage: 8,
    dogsQty: 0,
}

// Seteamos el reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DOGS:
            const created = action.payload.filter(dog => dog.created);
            const dogsPayload = [...action.payload];
            const dog = action.payload.splice(0, state.itemsPerPage);
            return {
                ...state,
                allDogs: dogsPayload,
                filteredDogs: dogsPayload,
                orderedDogs: dogsPayload,
                shownDogs: dog,
                createdDogs: created,
                dogsQty: state.filteredDogs.length,
            };

        case GET_ALL_TEMPS:
            const orderedTemps = action.payload.sort((a, b) => a.localeCompare(b));
            return {
                ...state,
                allTemps: orderedTemps,
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

        case FILTER_DOGS:
            let updatedDogs;
            console.log(action.payload);
            if (action.payload === 'Show all') {
                updatedDogs = state.allDogs
            }
            else {
                updatedDogs = [...state.allDogs].filter(dog => {
                    if (typeof dog.temperament === 'string') return dog.temperament.includes(action.payload);
                })
            }

            return {
                ...state,
                filteredDogs: updatedDogs,
                shownDogs: [...updatedDogs].slice(0, state.itemsPerPage),
                currentPage: 1,
                dogsQty: updatedDogs.length,
            };

        case PAGINATION:
            let page;
            let dogs;

            // If next page
            if (action.payload === 'next') {
                page = state.currentPage + 1;
                dogs = [...state.filteredDogs].splice(state.currentPage * state.itemsPerPage, state.itemsPerPage);
            }

            // If previous page
            if (action.payload === 'prev') {
                page = state.currentPage - 1;
                dogs = [...state.filteredDogs].splice((page - 1) * state.itemsPerPage, state.itemsPerPage);
            }

            return {
                ...state,
                currentPage: page,
                shownDogs: dogs,
            };

        default:
            return state;
    }
}