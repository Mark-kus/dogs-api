import { useState } from 'react';
import Loader from '../Loader/Loader';
import styles from './Detail.module.css';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Detail() {
    const { detailDog } = useSelector(state => state);
    const [load, setLoad] = useState(false);

    setTimeout(() => {
        setLoad(true);
    }, 1000)

    return (
        <>
            {load ? <section className={styles.detail}>
                <Link to="/dogs" className={styles.backButton}> 🢀 Back </Link>

                <img src={detailDog.image} className={styles.dogBigExample} alt={`${detailDog.name} example`} />

                <div className={styles.data}>

                    <div className={styles.topData}>
                        <div>
                            Height
                            <h5>{detailDog.height} cm</h5>
                        </div>

                        <div className={styles.dogName}>
                            <h1>{detailDog.name}</h1>
                            <h6>{detailDog.id}</h6>
                            <h4>Life span: {detailDog.lifespan}</h4>
                        </div>

                        <div>
                            Weight
                            <h5>{!detailDog.weight.includes('NaN') ? `${detailDog.weight} kg` : 'Sin peso'}</h5>
                        </div>
                    </div>


                    <h4>{detailDog.temperament}</h4>
                </div>

            </section> : <Loader />}
        </>
    )
}