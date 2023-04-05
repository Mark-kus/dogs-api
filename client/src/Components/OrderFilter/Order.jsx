import { useDispatch } from "react-redux"

// import orderDogs from '../../Redux/actions/dogs/orderDogs.js';

export default function Order () {
    const dispatch = useDispatch();

    const orderHandler = (e) => {
        // dispatch(orderDogs(e.target.value));
    }

    return (
        <>
        <select onChange={orderHandler} name="order" id="order">
            <option  value="Ascendente">Ascendente</option>
            <option  value="Descendente">Descendente</option>
            {/* por peso también */}
        </select>
        </>
    )
}