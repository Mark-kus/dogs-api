import axios from 'axios';
import { GET_DOG_BY_NAME } from '../../types';

export default (name) => {
    return async (dispatch) => {
        const response = await axios(`http//:localhost:3001/dogs/name?name=${name}`);

        return dispatch({
            type: GET_DOG_BY_NAME,
            payload: response.data,
        });
    }
}