import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Form.module.css';

import validate from './validate.js';
import createDog from '../../Redux/actions/dogs/createDog.js';

export default function Form() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allTemps } = useSelector(state => state);
    const [completed, setCompleted] = useState(false)
    const [inputs, setInputs] = useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        minLifespan: '',
        maxLifespan: '',
        temperament: [],
        image: '',
    });
    const [errors, setErrors] = useState({
        temperament: 'The dog should have at least one temperament',
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
        completedInputs(value, name);
    }

    const temperHandler = (e) => {
        const { value } = e.target;
        // Si ya existe el temperamento, no hace nada
        if (inputs.temperament.includes(value) || inputs.temperament.length === 5) return;
        // Si no, lo pasa a inputs y errors
        setInputs({
            ...inputs,
            // Temperaments, es el valor ingresado, más los 4 primeros temps ya seleccionados
            temperament: [...inputs.temperament, value],
        });
        setErrors(
            validate({
                ...inputs,
                temperament: [...inputs.temperament, value],
            })
        );
    }

    const deleteTempHandler = (e) => {
        const deleteTemp = e.target.innerText;
        const newTemps = [...inputs.temperament.filter(temp => temp !== deleteTemp)];
        setInputs({
            ...inputs,
            temperament: [...newTemps],
        });
        setErrors(
            validate({
                ...inputs,
                temperament: [...newTemps],
            })
        );
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createDog({
            name: inputs.name,
            height: `${inputs.minHeight} - ${inputs.maxHeight}`,
            weight: `${inputs.minWeight} - ${inputs.maxWeight}`,
            lifespan: `${inputs.minLifespan} - ${inputs.maxLifespan}`,
            image: inputs.image,
            temperament: inputs.temperament,
        }));
        navigate("/dogs");
    }

    const completedInputs = (value, name) => {
        const testInputs = { ...inputs, [name]: value }
        const completes = Object.values(testInputs).map(input => {
            if (input.length > 0) return true;
            else return false;
        })
        if ([...completes].every(Boolean)) setCompleted(true);
        else setCompleted(false);
    }

    return (
        <form onSubmit={submitHandler} className={styles.createForm}>
            <div className={styles.container}>
                <h1>Create Dog</h1>

                <input placeholder='Name' onChange={changeHandler} name='name' type="text" />
                <p>{errors?.name}</p>

                <div className={styles.numeralInputs}>
                    <div>
                        <input placeholder='Min height' onChange={changeHandler} name='minHeight' type="number" />
                        <input placeholder='Max height' onChange={changeHandler} name='maxHeight' type="number" />
                    </div>
                    <p>{errors?.minHeight || errors?.maxHeight}</p>

                    <div>
                        <input placeholder='Min weight' onChange={changeHandler} name='minWeight' type="number" />
                        <input placeholder='Max weight' onChange={changeHandler} name='maxWeight' type="number" />
                    </div>
                    <p>{errors?.minWeight || errors?.maxWeight}</p>

                    <div>
                        <input placeholder='Min life span' onChange={changeHandler} name='minLifespan' type="number" />
                        <input placeholder='Max life span' onChange={changeHandler} name='maxLifespan' type="number" />
                    </div>
                    <p>{errors?.minLifespan || errors?.maxLifespan}</p>
                </div>

                <select onChange={temperHandler} name="temperament">
                    <option value='' hidden>Select up to 5 temperament</option>
                    {allTemps.map((temper, i) => {
                        return <option key={i} value={temper}>{temper}</option>
                    })}
                </select>
                <div className={styles.tempContainer}>
                    {inputs?.temperament.map((temp, i) => (
                        <span
                            key={i}
                            className={styles.temp}
                            onClick={deleteTempHandler}
                        >{temp}</span>
                    ))}
                </div>
                <p>{errors?.temperament}</p>

                <input onChange={changeHandler} name='image' placeholder='Insert URL of the dog' type="text" />
                <p>{errors?.image}</p>

                {!Object.values(errors).length && completed
                    ? <button type='submit'>Submit dog</button>
                    : <div className={styles.submitnt}>Completa los campos</div>}
            </div>
        </form >
    )
}