import axios from 'axios';

export const GET_DOG_BY_NAME = 'GET_DOG_BY_NAME';

export const getDogByName = (name) => {
    return async (dispatch) => {
        const response = axios(`http//:localhost:3001/dogs/name?name=${name}`);

        return dispatch({
            type: GET_DOG_BY_NAME,
            payload: response.data,
        });
    }
}