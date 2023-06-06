import styles from './Detail.module.css';
import Loader from '../Loader/Loader';
import deleteDog from '../../Redux/actions/dogs/deleteDog';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function Detail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { detailDog } = useSelector(state => state);
    const [load, setLoad] = useState(false);

    setTimeout(() => {
        setLoad(true);
    }, 1000)

    const deleteCard = () => {
        dispatch(deleteDog(detailDog.id))
        navigate('/dogs');
    }

    return (
        <>
            {load ? <section className={styles.detail}>
                <div className={styles.buttons}>
                    <Link to="/dogs" className={styles.backButton}> 🠔 Back </Link>
                    {detailDog.created ? <button onClick={deleteCard} className={styles.backButton}>X</button> : ''}
                </div>

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