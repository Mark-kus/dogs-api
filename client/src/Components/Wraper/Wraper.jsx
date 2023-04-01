import styles from './Wraper.module.css';
import getAllDogs from '../../Redux/actions/dogs/getAllDogs.js'

import Card from '../Card/Card';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Wraper() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllDogs());
    }, []);
    const allDogs = useSelector(state => state.allDogs);

    // Paginación
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

    return (
        <div className={styles.container}>

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

        </div>
    )
}