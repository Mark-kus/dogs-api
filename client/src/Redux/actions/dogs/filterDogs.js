import { FILTER_DOGS } from "../../types";

const filterDogs = (filter) => {
    return {
        type: FILTER_DOGS,
        payload: filter,
    }
}

export default filterDogs;