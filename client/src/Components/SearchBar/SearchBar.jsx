// SearchBar: un input de búsqueda para encontrar razas de perros por nombre.
import styles from './Searchbar.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import getDogByName from '../../Redux/actions/dogs/getDogByName';

export default function Searchbar() {
    const dispatch = useDispatch();
    const { searchDogs } = useSelector(state => state);
    let shownList = [...searchDogs].splice(0, 8);
    const [input, setInput] = useState('');

    const searchHandler = (e) => {
        setInput(e.target.value);
        dispatch(getDogByName(e.target.value));
        shownList = [...searchDogs].splice(0, 8);
    }

    const selectHandler = (e) => {
        // if (e.target.tag !== 'li') setInput('');
    }

    return (
        <div className={styles.searchbar}>
            <input
                value={input}
                placeholder='Search for breed'
                autoComplete='off'
                onChange={searchHandler}
                // onBlur={selectHandler}
                id="raceName"
                type="text"
                name="raceName"
                aria-autocomplete='both'
                aria-label='Search for breed'
            />
            <ul role='listbox'
                className={input ? '' : styles.hidden}
                aria-label='Search for breed'>
                {shownList.length ? shownList.map(dog => <Link
                    key={dog.id}
                    className={styles.link}
                    to={`/dogs/${dog.id}`}
                    role='option'
                    onClick={selectHandler}
                >
                    {dog.name}
                </Link>) : <li className={styles.linknt}>The breed doesn't exists</li>}
            </ul>
        </div >
    )
}