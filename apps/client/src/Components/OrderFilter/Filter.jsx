import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import filterDogs from "../../Redux/actions/dogs/filterDogs";

import styles from "./Filter.module.css";

export default function Filter() {
  const dispatch = useDispatch();
  const { allTemps, createdDogs } = useSelector((state) => state);
  const [created, setCreated] = useState(false);

  const createdHandler = () => {
    setCreated(!created);
    dispatch(filterDogs("rerender", !created));
  };

  const filterHandler = (e) => {
    dispatch(filterDogs(e.target.value, created));
  };

  return (
    <div className={styles.filterContainer}>
      {createdDogs.length > 0 && (
        <label htmlFor="NoCreated" className={styles.label}>
          Created only
          <input
            onChange={createdHandler}
            type="checkbox"
            id="NoCreated"
            className={styles.checkbox}
          />
        </label>
      )}
      <select
        onChange={filterHandler}
        name="filter"
        id="filter"
        className={styles.select}
      >
        <option value="Show all">Show all</option>
        {allTemps?.map((temp, i) => (
          <option key={i} value={temp} className={styles.option}>
            {temp}
          </option>
        ))}
      </select>
    </div>
  );
}
