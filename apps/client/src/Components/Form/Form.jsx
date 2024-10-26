import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../Redux/hooks.js";
import styles from "./Form.module.css";

import validate from "./validate.js";
import createDog from "../../Redux/actions/dogs/createDog.js";

export default function Form() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { allTemps } = useAppSelector((state) => state);
  const [completed, setCompleted] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minLifespan: "",
    maxLifespan: "",
    temperament: [],
    image: "",
  });
  const [errors, setErrors] = useState({
    temperament: "The dog should have at least one temperament",
  });
  const [submitting, setSubmitting] = useState(false)

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    setErrors(
      validate({
        ...inputs,
        [name]: value,
      })
    );
    completedInputs(value, name);
  };

  const temperHandler = (e) => {
    const { value } = e.target;
    // Si ya existe el temperamento, no hace nada
    if (inputs.temperament.includes(value) || inputs.temperament.length === 5)
      return;
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
    completedInputs(value, "temperament");
  };

  const deleteTempHandler = (e) => {
    const deleteTemp = e.target.innerText;
    const newTemps = [
      ...inputs.temperament.filter((temp) => temp !== deleteTemp),
    ];
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
  };

  const submitHandler = async (e) => {
    setSubmitting(true)
    e.preventDefault();
    const response = await dispatch(
      createDog({
        name: inputs.name,
        height: `${inputs.minHeight} - ${inputs.maxHeight}`,
        weight: `${inputs.minWeight} - ${inputs.maxWeight}`,
        lifespan: `${inputs.minLifespan} - ${inputs.maxLifespan}`,
        image: inputs.image,
        temperament: inputs.temperament,
      })
    );
    setSubmitting(false)
    navigate(`/dogs/${response.dog_id || ''}`);
  };

  const completedInputs = (value, name) => {
    const testInputs = { ...inputs, [name]: value };
    const completes = Object.values(testInputs).map((input) => {
      if (input.length > 0) return true;
      else return false;
    });
    if ([...completes].every(Boolean)) setCompleted(true);
    else setCompleted(false);
  };

  return (
    <form onSubmit={submitHandler} className={styles.createForm}>
      <div className={styles.container}>
        <h1>Add Breed</h1>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Name
            <input
              placeholder="Name"
              onChange={changeHandler}
              name="name"
              type="text"
            />
          </label>
          <p>{errors?.name}</p>
        </div>

        <div className={styles.numeralInputs}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Min height
              <input
                className={styles.minInput}
                placeholder="Min height"
                onChange={changeHandler}
                name="minHeight"
                type="number"
              />
            </label>
            <label className={styles.label}>
              Max height
              <input
                className={styles.maxInput}
                placeholder="Max height"
                onChange={changeHandler}
                name="maxHeight"
                type="number"
              />
            </label>
            <p>{errors?.minHeight || errors?.maxHeight}</p>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Min weight
              <input
                className={styles.minInput}
                placeholder="Min weight"
                onChange={changeHandler}
                name="minWeight"
                type="number"
              />
            </label>
            <label className={styles.label}>
              Max weight
              <input
                className={styles.maxInput}
                placeholder="Max weight"
                onChange={changeHandler}
                name="maxWeight"
                type="number"
              />
            </label>
            <p>{errors?.minWeight || errors?.maxWeight}</p>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Min life span
              <input
                className={styles.minInput}
                placeholder="Min life span"
                onChange={changeHandler}
                name="minLifespan"
                type="number"
              />
            </label>
            <label className={styles.label}>
              Max life span
              <input
                className={styles.maxInput}
                placeholder="Max life span"
                onChange={changeHandler}
                name="maxLifespan"
                type="number"
              />
            </label>
            <p>{errors?.minLifespan || errors?.maxLifespan}</p>
          </div>
        </div>

        <div className={styles.tempGroup}>
          <label className={styles.label}>
            Temperaments
            <select onChange={temperHandler} name="temperament">
              <option value="" hidden>
                Select up to 5 temperaments
              </option>
              {allTemps.map((temper, i) => {
                return (
                  <option key={i} value={temper}>
                    {temper}
                  </option>
                );
              })}
            </select>
          </label>
          <div className={styles.tempContainer}>
            {inputs?.temperament.map((temp, i) => (
              <span
                key={i}
                className={styles.temp}
                aria-label="Delete temperament"
                onClick={deleteTempHandler}
              >
                {temp}
              </span>
            ))}
          </div>
          <p>{errors?.temperament}</p>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Image URL
            <input
              onChange={changeHandler}
              name="image"
              placeholder="Insert URL of the dog"
              type="text"
            />
          </label>
          <p>{errors?.image}</p>
        </div>

        <button
          disabled={!(Object.values(errors).length === 0 && completed)}
          className={
            Object.values(errors).length && completed
              ? styles.submit
              : styles.disabled
          }
          type="submit"
        >
          Submit dog
        </button>
      </div>
    </form>
  );
}
