import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import filterDogs from "../../Redux/actions/dogs/filterDogs";

import styles from "./Filter.module.css";

export default function Filter() {
  const dispatch = useAppDispatch();
  const { allTemps, createdDogs, allDogs } = useAppSelector((state) => state);
  const [created, setCreated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const order = queryParams.get("order");
    if (order && allDogs.length) {
      dispatch(filterDogs(order));
    }
  }, [location.search, dispatch, allDogs.length]);

  const modifyURL = (key, value) => {
    if (!value) {
      const queryParams = new URLSearchParams(location.search);
      queryParams.delete(key);
      window.history.pushState(
        null,
        "",
        `${location.pathname}?${queryParams.toString()}`
      );
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    queryParams.set(key, value);
    window.history.pushState(
      null,
      "",
      `${location.pathname}?${queryParams.toString()}`
    );
  };

  const createdHandler = () => {
    // Modifica la URL
    if (!created) {
      modifyURL("created", "true");
    } else {
      modifyURL("created", false);
    }

    setCreated(!created);
    dispatch(filterDogs("rerender", !created));
  };

  const filterHandler = (e) => {
    // Modifica la URL
    if (e.target.value !== "Show all") {
      modifyURL("filter", e.target.value);
    } else {
      modifyURL("filter", false);
    }

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
