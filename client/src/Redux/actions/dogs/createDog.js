import axios from 'axios';
import { CREATE_DOG } from '../../types';

const createDog = (dogData) => {
    return async (dispatch) => {
        const response = await axios.post('http://localhost:3001/dogs', { dogData });

        return dispatch({
            type: CREATE_DOG,
            payload: response.data,
        })
    }
}

export default createDog;