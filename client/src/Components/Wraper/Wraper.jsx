import styles from './Wraper.module.css';

import Card from '../Card/Card';
import Loader from '../Loader/Loader.jsx';
import Filter from '../OrderFilter/Filter.jsx';
import Order from '../OrderFilter/Order.jsx';

import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Wraper() {
    const allDogs = useSelector(state => state.allDogs);

    // Paginación
    // Todavía se pierde una página
    const itemsPerPage = 8;
    const dogsQty = allDogs.length;
    const [currentPage, setCurrentPage] = useState(1);
    const [shownDogs, setShownDogs] = useState([...allDogs].splice(0, itemsPerPage));

    const prevHandler = () => {
        const prevPage = currentPage - 1;
        if (currentPage === 1) return;
        setShownDogs([...allDogs].splice((prevPage - 1) * itemsPerPage, itemsPerPage));
        setCurrentPage(prevPage);
    }

    const nextHandler = () => {
        const firstIndex = (currentPage + 1) * itemsPerPage;
        if (firstIndex > dogsQty) return;
        setShownDogs([...allDogs].splice(firstIndex, itemsPerPage));
        setCurrentPage(currentPage + 1);
    }
    // Fin de paginación

    const reorder = () => {
        setShownDogs([...allDogs].splice(currentPage * itemsPerPage, itemsPerPage));
    }

    return (
        <div className={styles.container}>

            {shownDogs ? <>
                <div className={styles.orderFilter}>
                    <Order reorder={reorder} />
                    <div className={styles.pagination}>
                        <button onClick={prevHandler}>&laquo;</button>
                        <h4>Página {currentPage}</h4>
                        <button onClick={nextHandler}>&raquo;</button>
                    </div>
                    <Filter />
                </div>
                <section>
                    {shownDogs.map(dog => <Card
                        key={dog.id}
                        dog={dog} />)}

                </section>
                <div className={styles.pagination}>
                    <button onClick={prevHandler}>&laquo;</button>
                    <h4>Página {currentPage}</h4>
                    <button onClick={nextHandler}>&raquo;</button>
                </div>
            </> : <Loader />
            }

        </div >
    )
}