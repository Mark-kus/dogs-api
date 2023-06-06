import styles from './Card.module.css';

import { Link } from 'react-router-dom';

export default function Card({ dog }) {
    return (
        <article>
            <Link to={`/dogs/${dog.id}`}>
                <img src={dog.image} className={styles.dogExample} alt={`${dog.name} example`} />
            </Link>

            <h3>
                {dog.name}
            </h3>

            <div>
                {dog.temperament ? dog.temperament : 'These dog has no temperament assigned'}
                <br />
                {!dog.weight.includes('NaN') ? `${dog.weight} kg` : 'Sin peso indicado'}
            </div>
        </article>
    )
}