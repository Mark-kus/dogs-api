import { ORDER_DOGS } from '../../types.js';

const orderDogs = (order) => {
    return {
        type: ORDER_DOGS,
        payload: order,
    }
}

export default orderDogs;