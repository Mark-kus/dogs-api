import styles from './Wraper.module.css';

import Card from '../Card/Card';
import Filter from '../OrderFilter/Filter.jsx';
import Order from '../OrderFilter/Order.jsx';
import pagination from '../../Redux/actions/dogs/pagination';

import { useDispatch, useSelector } from 'react-redux';

export default function Wraper() {
    const { shownDogs, currentPage, itemsPerPage, dogsQty } = useSelector(state => state);
    const dispatch = useDispatch();

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

    // Vuelve a la pagina 1
    const reorder = () => {
        dispatch(pagination('reset'));
        dogsQty = shownDogs.length;
    }
    
    return (
        <div className={styles.container}>
            <>
                <div className={styles.orderFilter}>
                    <Order reorder={reorder} />
                    <div className={styles.pagination}>
                        <button onClick={prevHandler}>&laquo;</button>
                        <h4>Página {currentPage}</h4>
                        <button onClick={nextHandler}>&raquo;</button>
                    </div>
                    <Filter reorder={reorder} />
                </div>
                <section>
                    {shownDogs?.map(dog => <Card
                        key={dog.id}
                        dog={dog} />)}
                </section>
                <div className={styles.pagination}>
                    <button onClick={prevHandler}>&laquo;</button>
                    <h4>Página {currentPage}</h4>
                    <button onClick={nextHandler}>&raquo;</button>
                </div>
            </>

        </div >
    )
}