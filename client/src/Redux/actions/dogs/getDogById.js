import axios from 'axios';

export const GET_DOG_BY_ID = 'GET_DOG_BY_ID';

export const getDogById = (id) => {
    return async (dispatch) => {
        const response = await axios(`http://lcoalhost:3001/dogs/${id}`)

        return dispatch({
            type: GET_DOG_BY_ID,
            paylaod: response.data,
        })
    }
}