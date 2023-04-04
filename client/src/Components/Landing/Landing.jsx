import styles from './Landing.module.css';

import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div className={styles.container}>
        <Link className={styles.link} to='/dogs'>Go see dogs</Link>
        </div>
    )
}