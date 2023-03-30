import axios from 'axios';

export const CREATE_DOG = 'CREATE_DOG';

export const createDog = (dogData) => {
    return async (dispatch) => {
        const response = axios.post('http://localhost:3001/dogs',
        {});

        return dispatch({
            type: CREATE_DOG,
            payload: response.data,
        })
    }
}