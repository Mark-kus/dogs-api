import styles from './Wraper.module.css';
import getAllDogs from '../../Redux/actions/dogs/getAllDogs.js'

import Card from '../Card/Card';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function (props) {
    const { allDogs } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch
    }, []);

    return (
        <section>
            {dogs.map(dog => <Card dog={dog} />)}
        </section>
    )
}