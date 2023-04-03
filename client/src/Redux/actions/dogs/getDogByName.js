import axios from 'axios';
import { GET_DOG_BY_NAME } from '../../types';

const getDogByName = (name) => {
    return async (dispatch) => {
        const response = await axios(`http://localhost:3001/dogs/name?q=${name}`);

        return dispatch({
            type: GET_DOG_BY_NAME,
            payload: response.data,
        });
    }
}

export default getDogByName;