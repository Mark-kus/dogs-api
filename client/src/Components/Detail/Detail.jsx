import Loader from '../Loader/Loader';
import styles from './Detail.module.css';

import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Detail() {
    const [load, setLoad] = useState(false);
    const { detailDog } = useSelector(state => state);

    setTimeout(() => {
        setLoad(true);
    }, 1000);

    return (
        <>
            {load ? <>
                {detailDog.id}
                {detailDog.name}
                {detailDog.height.imperial}
                {detailDog.weight.imperial}
                {detailDog.temperament}
                {detailDog.life_span}
                <img src={detailDog.image.url} className={styles.dogBigExample} alt={`${detailDog.name} example`} />
            </> : <Loader />}
        </>
    )
}