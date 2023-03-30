import axios from 'axios';
import { GET_ALL_TEMPS } from '../../types';

export default () => {
    return async (dispatch) => {
        const response = await axios('http://localhost:3001/temperaments');

        return dispatch({
            type: GET_ALL_TEMPS,
            payload: response.data,
        })
    }
}