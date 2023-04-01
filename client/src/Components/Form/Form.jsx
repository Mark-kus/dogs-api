// Este formulario debe ser controlado completamente con JavaScritp.
// Posibilidad de seleccionar/agregar varios temperamentos en simultáneo.
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Form.module.css';

import validate from './validate.js';
import createDog from '../../Redux/actions/dogs/createDog.js';

export default function Form() {
    const dispatch = useDispatch();
    const { allTemps } = useSelector(state => state);

    const [inputs, setInputs] = useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        minLifespan: '',
        maxLifespan: '',
        temperaments: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        minLifespan: '',
        maxLifespan: '',
        temperaments: '',
    });

    const changeHandler = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        })
        setErrors(validate({
            ...inputs,
            [name]: value,
        }));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createDog(inputs));
    }

    return (
        <form onSubmit={submitHandler} className={styles.createForm}>
            <label htmlFor="name">Name</label>
            <input onChange={changeHandler} type="text" id='name' />
            <p>{errors?.name}</p>

            <div className={styles.numeralInputs}>
                
                <label htmlFor="height">Height</label>
                <div>
                    <input onChange={changeHandler} name='minHeight' type="number" id='height' />
                    <input onChange={changeHandler} name='maxHeight' type="number" id='height' />
                </div>
                <p>{errors?.minHeight || errors?.maxHeight}</p>

                <label htmlFor="weight">Weight</label>
                <div>
                    <input onChange={changeHandler} name='minWeight' type="number" id='weight' />
                    <input onChange={changeHandler} name='maxWeight' type="number" id='weight' />
                </div>
                <p>{errors?.minWeight || errors?.maxWeight}</p>

                <label htmlFor="lifespan">Life-span</label>
                <div>
                    <input onChange={changeHandler} name='minLifespan' type="number" id='lifespan' />
                    <input onChange={changeHandler} name='maxLifespan' type="number" id='lifespan' />
                </div>
                <p>{errors?.minLifespan || errors?.maxLifespan}</p>

            </div>

            <label htmlFor="temperaments">Dog temperaments</label>
            <select name="temperaments" id="temperaments" multiple>
                {allTemps.map((temper, i) => {
                    return <option key={i} value={temper}>{temper}</option>
                })}
            </select>
            <p>{errors?.temperaments}</p>

            {/* <label htmlFor="image">Seleccione una imagen</label>
            <input type="file" name='image' id='image' /> */}

            <button type='submit'>Submit dog</button>
        </form>
    )
}