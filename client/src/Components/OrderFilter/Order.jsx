import { useDispatch } from "react-redux"

import orderDogs from '../../Redux/actions/dogs/orderDogs.js';

export default function Order ({reorder}) {
    const dispatch = useDispatch();

    const orderHandler = (e) => {
        dispatch(orderDogs(e.target.value));
        reorder();
    }

    return (
        <div>
        <select onChange={orderHandler} name="order" id="order">
            <option  value="Ascendente">A-Z</option>
            <option  value="Descendente">Z-A</option>
            {/* por peso también */}
        </select>
        </div>
    )
}