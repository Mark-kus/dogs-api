import Loader from '../Loader/Loader';
import styles from './Detail.module.css';

import { useState } from 'react';

export default function Detail({ dog }) {
    const [load, setLoad] = useState(false)

    setTimeout(() => {
        setLoad(true);
    }, 600);

    return (
        <>
            {load ? <>
                {dog.id}
                {dog.name}
                {dog.height}
                {dog.weight}
                {dog.temperament}
                {dog.life_span}
                <img src={dog.image.url} className={styles.dogBigExample} alt={`${dog.name} example`} />
            </> : <Loader />}
        </>
    )
}