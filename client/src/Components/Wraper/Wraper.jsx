import styles from './Wraper.module.css';

import Card from '../Card/Card';
import Loader from '../Loader/Loader.jsx';

import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Wraper() {
    const allDogs = useSelector(state => state.allDogs);
    const [load, setLoad] = useState(false);

    // Paginación
    // Todavía se pierde una página
    const itemsPerPage = 8;
    const dogsQty = allDogs.length;
    const [currentPage, setCurrentPage] = useState(1);
    const [shownDogs, setShownDogs] = useState([...allDogs].splice(0, itemsPerPage));

    const prevHandler = () => {
        const prevPage = currentPage - 1;
        if (currentPage === 1) return;
        setLoad(false)
        setShownDogs([...allDogs].splice((prevPage - 1) * itemsPerPage, itemsPerPage));
        setCurrentPage(prevPage);
    }

    const nextHandler = () => {
        const firstIndex = (currentPage + 1) * itemsPerPage;
        if (firstIndex > dogsQty) return;
        setLoad(false)
        setShownDogs([...allDogs].splice(firstIndex, itemsPerPage));
        setCurrentPage(currentPage + 1);
    }
    // Fin de paginación

    setTimeout(() => {
        setLoad(true);
    }, 1000);

    return (
        <div className={styles.container}>

            {load ? <>
                <section>
                    {shownDogs.map(dog => <Card
                        key={dog.id}
                        dog={dog} />)}

                </section>
                <div>
                    <button onClick={prevHandler}>Prev</button>
                    <h4>Página {currentPage}</h4>
                    <button onClick={nextHandler}>Next</button>
                </div>
            </> : <Loader />}

        </div>
    )
}