import styles from './Wraper.module.css';
import getAllDogs from '../../Redux/actions/dogs/getAllDogs.js'

import Card from '../Card/Card';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Wraper() {
    const allDogs = useSelector(state => state.allDogs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllDogs());
    }, []);

    return (
        <section>
            {allDogs.map(dog => <Card
                key={dog.id}
                dog={dog} />)}
        </section>
    )
}