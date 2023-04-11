import styles from './Wraper.module.css';

import Card from '../Card/Card';
import Filter from '../OrderFilter/Filter.jsx';
import Order from '../OrderFilter/Order.jsx';
import pagination from '../../Redux/actions/dogs/pagination';

import { useDispatch, useSelector } from 'react-redux';

export default function Wraper() {
    const { shownDogs, currentPage, itemsPerPage, dogsQty } = useSelector(state => state);
    const dispatch = useDispatch();

    // Página inicial
    const startHandler = () => {
        dispatch(pagination('start'));
    }

    // Página final
    const endHandler = () => {
        dispatch(pagination('end'));
    }

    // Página anterior
    const prevHandler = () => {
        if (currentPage === 1) return;
        dispatch(pagination('prev'));
    }

    // Página siguiente
    const nextHandler = () => {
        if (currentPage * itemsPerPage >= dogsQty) return;
        dispatch(pagination('next'));
    }

    return (
        <div className={styles.container}>
            <>
                <div className={styles.orderFilter}>
                    <Order />
                    <div className={styles.pagination}>
                        <button className={styles.finalPagination} onClick={startHandler}>&lArr;</button>
                        <button onClick={prevHandler}>&lt;</button>
                        <h4>Página {currentPage}</h4>
                        <button onClick={nextHandler}>&gt;</button>
                        <button className={styles.finalPagination} onClick={endHandler}>&rArr;</button>
                    </div>
                    <Filter />
                </div>
                <section>
                    {shownDogs?.map(dog => <Card
                        key={dog.id}
                        dog={dog} />)}
                </section>
                <div className={styles.pagination}>
                    <button onClick={startHandler}>&lArr;</button>
                    <button onClick={prevHandler}>&lt;</button>
                    <h4>Página {currentPage}</h4>
                    <button onClick={nextHandler}>&gt;</button>
                    <button onClick={endHandler}>&rArr;</button>
                </div>
            </>

        </div >
    )
}