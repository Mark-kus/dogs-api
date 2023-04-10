import styles from './Wraper.module.css';

import Card from '../Card/Card';
import Filter from '../OrderFilter/Filter.jsx';
import Order from '../OrderFilter/Order.jsx';
import pagination from '../../Redux/actions/dogs/pagination';

import { useDispatch, useSelector } from 'react-redux';

export default function Wraper() {
    const {filteredDogs, currentPage} = useSelector(state => state);
    const dispatch = useDispatch();

    // Inicio de Paginación
    const itemsPerPage = 8;
    const dogsQty = filteredDogs.length;
    [...filteredDogs].splice(0, itemsPerPage);

    const prevHandler = () => {
        if (currentPage === 1) return;
        dispatch(pagination('prev'));
        const prevPage = currentPage - 1;
        setShownDogs([...filteredDogs].splice((prevPage - 1) * itemsPerPage, itemsPerPage));
    }

    const nextHandler = () => {
        const firstIndex = currentPage * itemsPerPage;
        if (firstIndex >= dogsQty) return;
        dispatch(pagination('next'));
        setShownDogs([...filteredDogs].splice(firstIndex, itemsPerPage));
    }
    // Fin de paginación

    // Re-renderiza cuando cambia el ordenado
    const reorder = () => {
        setShownDogs([...filteredDogs].splice(0, itemsPerPage));
        dispatch(pagination('reset'));
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
                    {filteredDogs?.map(dog => <Card
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