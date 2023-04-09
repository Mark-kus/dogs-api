import styles from './Wraper.module.css';

import Card from '../Card/Card';
import Loader from '../Loader/Loader.jsx';
import Filter from '../OrderFilter/Filter.jsx';
import Order from '../OrderFilter/Order.jsx';

import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Wraper() {
    const modDogs = useSelector(state => state.modDogs);

    // Inicio de Paginación
    const itemsPerPage = 8;
    const dogsQty = modDogs.length;
    const [currentPage, setCurrentPage] = useState(1);
    const [shownDogs, setShownDogs] = useState([...modDogs].splice(0, itemsPerPage));
    const [load, setLoad] = useState(false);

    const prevHandler = () => {
        if (currentPage === 1) return;
        const prevPage = currentPage - 1;
        setShownDogs([...modDogs].splice((prevPage - 1) * itemsPerPage, itemsPerPage));
        setCurrentPage(prevPage);
    }

    const nextHandler = () => {
        const firstIndex = currentPage * itemsPerPage;
        if (firstIndex >= dogsQty) return;
        setShownDogs([...modDogs].splice(firstIndex, itemsPerPage));
        setCurrentPage(currentPage + 1);
    }
    // Fin de paginación

    // Re-renderiza cuando cambia el ordenado
    const reorder = () => {
        setShownDogs([...modDogs].splice(0, itemsPerPage));
        setCurrentPage(1);
        setLoad(false);
    }

    if (!load) setTimeout(() => { setLoad(true) }, 2000)

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
                {false ? <section>
                    {shownDogs.map(dog => <Card
                        key={dog.id}
                        dog={dog} />)}

                </section> : <Loader />}
                <div className={styles.pagination}>
                    <button onClick={prevHandler}>&laquo;</button>
                    <h4>Página {currentPage}</h4>
                    <button onClick={nextHandler}>&raquo;</button>
                </div>
            </> 

        </div >
    )
}