import axios from 'axios';
import { GET_ALL_DOGS } from '../../types';

const getAllDogs = () => {
    return async (dispatch) => {
        const response = await axios('/dogs');

        return dispatch({
            type: GET_ALL_DOGS,
            payload: response.data,
        });
    }
}

export default getAllDogs;