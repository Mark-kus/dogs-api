import axios from 'axios';

export const GET_ALL_DOGS = "GET_ALL_DOGS";

export const getAllDogs = () => {
    return async (dispatch) => {
        const response = await axios('http://localhost:3001/dogs');

        return dispatch({
            type: GET_ALL_DOGS,
            payload: response.data,
        });
    }
}