import axios from 'axios';
import { GET_DOG_BY_ID } from '../../types';

export default (id) => {
    return async (dispatch) => {
        const response = await axios(`http://lcoalhost:3001/dogs/${id}`)

        return dispatch({
            type: GET_DOG_BY_ID,
            paylaod: response.data,
        })
    }
}