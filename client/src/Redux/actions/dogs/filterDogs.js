import { FILTER_DOGS } from "../../types";

const filterDogs = (filter, created) => {
    return {
        type: FILTER_DOGS,
        payload: { filter, created },
    }
}

export default filterDogs;