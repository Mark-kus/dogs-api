import axios from 'axios';
import { GET_DOG_BY_ID } from '../../types';

const getDogById = (id) => {
    return async (dispatch) => {
        const [response] = (await axios(`/dogs/${id}`)).data;
        return dispatch({
            type: GET_DOG_BY_ID,
            payload: response,
        })
    }
}

export default getDogById;