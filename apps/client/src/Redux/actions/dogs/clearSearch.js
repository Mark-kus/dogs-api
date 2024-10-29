import { CLEAR_SEARCH } from '../../types.js';

const clearDogs = (order) => {
    return {
        type: CLEAR_SEARCH,
        payload: order,
    }
}

export default clearDogs;