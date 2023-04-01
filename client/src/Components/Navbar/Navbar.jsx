import Searchbar from '../Searchbar/Searchbar.jsx';
import styles from './Navbar.module.css';

import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav>
            <NavLink className={styles.title} to='/'>Dog Api</NavLink>

                <NavLink className={styles.links} to='/dogs'>Dogs</NavLink>
                <NavLink className={styles.links} to='/new'>New Dog</NavLink>

            <Searchbar />
        </nav>
    )
}