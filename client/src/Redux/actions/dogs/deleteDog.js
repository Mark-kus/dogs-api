import axios from 'axios';
import { DELETE_DOG } from '../../types';

const deleteDog = (id) => {
    return async (dispatch) => {
        await axios.delete(`/dogs/${id}`);

        return dispatch({
            type: DELETE_DOG,
            payload: id,
        })
    }
}

export default deleteDog;