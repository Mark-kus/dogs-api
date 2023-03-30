import axios from 'axios';
import { GET_ALL_DOGS } from '../../types';

export default () => {
    return async (dispatch) => {
        const response = await axios('http://localhost:3001/dogs');

        return dispatch({
            type: GET_ALL_DOGS,
            payload: response.data,
        });
    }
}