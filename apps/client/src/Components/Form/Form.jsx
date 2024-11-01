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
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showTemperaments, setShowTemperaments] = useState([]);

  const searchTemper = (e) => {
    const { value } = e.target;
    const temps = allTemps.filter((temp) =>
      temp.toLowerCase().includes(value.toLowerCase())
    );
    if (value.length === 0) setShowTemperaments([]);
    else setShowTemperaments(temps);
  };

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    const newErrors = validate({
      ...inputs,
      [name]: value,
    });
    setErrors(newErrors);
    completedInputs(value, name);
  };

  const temperHandler = (value) => {
    if (inputs.temperament.includes(value)) return;

      setInputs({
        ...inputs,
        temperament: [...inputs.temperament, value],
      });
    
    const newErrors = validate({
      ...inputs,
      temperament: [...inputs.temperament, value],
    });
    setErrors(newErrors);
    completedInputs(value, "temperament");
    // Delete input text
    document.querySelector('input[name="temperament"]').value = "";
    setShowTemperaments([]);
  };

  const deleteTempHandler = (deleteTemp) => {
    const newTemps = [
      ...inputs.temperament.filter((temp) => temp !== deleteTemp),
    ];
    setInputs({
      ...inputs,
      temperament: [...newTemps],
    });
    const newErrors = validate({
      ...inputs,
      temperament: [...newTemps],
    });
    setErrors(newErrors);
  };

  const submitHandler = async (e) => {
    setSubmitting(true);
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
    setSubmitting(false);
    navigate(`/dogs/${response.dog_id || ""}`);
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
        <h1 className={styles.title}>Add Breed</h1>

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
          {errors?.name && <p className={styles.error}>{errors.name}</p>}
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
          </div>
          {(errors?.minHeight || errors?.maxHeight) && (
            <p className={styles.error}>
              {errors.minHeight || errors.maxHeight}
            </p>
          )}

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
          </div>
          {(errors?.minWeight || errors?.maxWeight) && (
            <p className={styles.error}>
              {errors.minWeight || errors.maxWeight}
            </p>
          )}

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
          </div>
          {(errors?.minLifespan || errors?.maxLifespan) && (
            <p className={styles.error}>
              {errors.minLifespan || errors.maxLifespan}
            </p>
          )}
        </div>

        <div className={styles.tempGroup}>
          <label className={styles.label}>Temperaments</label>
          <input disabled={inputs?.temperament.length >= 5} onChange={searchTemper} name="temperament" />
          <ul className={styles.tempList}>
          {showTemperaments.map((temper, i) => {
            return (
              <li
                onClick={() => temperHandler(temper)}
                key={i}
                value={temper}
              >
                {temper}
              </li>
            );
          })}
          </ul>

        </div>
          <div className={styles.tempContainer}>
            {inputs?.temperament.map((temp, i) => (
              <span key={i} className={styles.temp}>
                {temp}
                <button
                  className={styles.deleteTemp}
                  aria-label="Delete temperament"
                  onClick={() => deleteTempHandler(temp)}
                  type="button"
                >
                  X
                </button>
              </span>
            ))}
          </div>
          {errors?.temperament && (
            <p className={styles.error}>{errors.temperament}</p>
          )}
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
          {errors?.image && <p className={styles.error}>{errors.image}</p>}
        </div>

        <button
          disabled={
            !(Object.values(errors).length === 0 && completed) || submitting
          }
          className={`${styles.button} ${
            Object.values(errors).length && completed
              ? styles.submit
              : styles.disabled
          }`}
          type="submit"
        >
          Submit dog
        </button>
      <p>The amount of breeds allowed to create is limited to 10, to avoid abuse.</p>
      </div>
    </form>
  );
}
