import { useDispatch } from "react-redux"

import orderDogs from '../../Redux/actions/dogs/orderDogs.js';

import styles from './Order.module.css';

export default function Order() {
    const dispatch = useDispatch();

    const orderHandler = (e) => {
        dispatch(orderDogs(e.target.value));
    }

    return (
        <div className={styles.orderContainer}>
            <select onChange={orderHandler} name="order" id="order" className={styles.orderSelect}>
                <option value="NAscendente" className={styles.orderOption}>Name Ascending</option>
                <option value="NDescendente" className={styles.orderOption}>Name Descending</option>
                <option value="WAscendente" className={styles.orderOption}>Weight Ascending</option>
                <option value="WDescendente" className={styles.orderOption}>Weight Descending</option>
            </select>
        </div>
    )
}