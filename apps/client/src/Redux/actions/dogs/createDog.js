import axios from 'axios';
import { CREATE_DOG } from '../../types';

const createDog = (dogData) => {
    return async (dispatch) => {
        const response = (await axios.post('/dogs', dogData)).data;

        return dispatch({
            type: CREATE_DOG,
            payload: response,
        })
    }
}

export default createDog;