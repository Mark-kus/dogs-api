import styles from './Landing.module.css';

import { NavLink } from 'react-router-dom';

export default function Landing() {
    return (
        <>
        <NavLink to='/dogs'>Go see dogs</NavLink>
        </>
    )
}