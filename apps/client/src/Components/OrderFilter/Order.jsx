import { useDispatch } from "react-redux"

import orderDogs from '../../Redux/actions/dogs/orderDogs.js';

export default function Order() {
    const dispatch = useDispatch();

    const orderHandler = (e) => {
        dispatch(orderDogs(e.target.value));
    }

    return (
        <div>
            <select onChange={orderHandler} name="order" id="order">
                <option value="NAscendente">Name ↑</option>
                <option value="NDescendente">Name ↓</option>
                <option value="WAscendente">Weight ↑</option>
                <option value="WDescendente">Weight ↓</option>
            </select>
        </div>
    )
}