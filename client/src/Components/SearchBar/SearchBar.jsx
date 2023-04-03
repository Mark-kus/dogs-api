// SearchBar: un input de búsqueda para encontrar razas de perros por nombre.
import styles from './Searchbar.module.css';

import { useDispatch, useSelector } from 'react-redux';

import getDogByName from '../../Redux/actions/dogs/getDogByName';

export default function Searchbar() {
    const dispatch = useDispatch();
    const { allDogs } = useSelector(state => state);

    const searchHandler = (e) => {
        dispatch(getDogByName(e.target.value))
    }

    return (
        <div>
            <label className={styles.searchLabel} htmlFor="raceName">Race name </label>
            <input autoComplete='off' onChange={searchHandler} id="raceName" type="text" name="raceName" />
        </div>
    )
}