// SearchBar: un input de búsqueda para encontrar razas de perros por nombre.
import styles from './SearchBar.module.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import getDogByName from '../../Redux/actions/dogs/getDogByName';

export default function Searchbar() {
    const dispatch = useAppDispatch();
    const { searchDogs } = useAppSelector(state => state);
    let shownList = [...searchDogs].splice(0, 8);
    const [input, setInput] = useState('');
    const [searching, setSearching] = useState(false)

    const searchHandler = async ({target:{value}}) => {
        setSearching(true);
        setInput(value);
        // await dispatch(getDogByName(value));
        shownList = [...searchDogs].splice(0, 8);
        setSearching(false);
    }

    const selectHandler = (e) => {
        // if (e.target.tag !== 'li') setInput('');
    }

    return (
        <div className={styles.searchbar}>
            <input
                value={input}
                placeholder='Search for a breed'
                onChange={searchHandler}
                // onBlur={selectHandler}
                id="breed"
                type="text"
                name="breed"
                aria-autocomplete='both'
                aria-label='Search for breed'
            />
            <ul role='listbox'
                className={styles.list}
                aria-label='Search for breed'>
                {searching ? (
                    <li className={styles.loader}></li>
                ) : (
                    shownList.length ? shownList.map(dog => (
                        <Link
                            key={dog.id}
                            className={styles.link}
                            to={`/dogs/${dog.id}`}
                            role='option'
                            onClick={selectHandler}
                        >
                            {dog.name}
                        </Link>
                    )) : (
                        <li className={styles.linknt}>The breed doesn't appear to exists</li>
                    )
                )}
            </ul>
        </div>
    )
}