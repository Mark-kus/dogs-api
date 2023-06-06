import { PAGINATION } from "../../types";

const pagination = (move) => {
    return {
        type: PAGINATION,
        payload: move
    }
}

export default pagination;