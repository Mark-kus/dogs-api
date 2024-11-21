import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import filterDogs from "../../Redux/actions/dogs/filterDogs";

import styles from "./Filter.module.css";
import { modifyQueryFromURL } from "./utils";

export default function Filter() {
  const dispatch = useAppDispatch();
  const allTemps = useAppSelector((state) => state.allTemps);
  const createdDogs = useAppSelector((state) => state.createdDogs);
  const allDogs = useAppSelector((state) => state.allDogs);
  const [created, setCreated] = useState(false);
  const [selected, setSelected] = useState("Show all");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filter = queryParams.get("filter");
    const created = queryParams.get("created") === "true";

    if (created) setCreated(created);
    if (filter) setSelected(filter);
    if ((filter || created) && allDogs.length) {
      dispatch(filterDogs(filter, created));
    }
  }, [location.search, dispatch, allDogs.length]);

  const createdHandler = () => {
    const newCreatedValue = !created;
    // Modifica la URL
    if (newCreatedValue) {
      modifyQueryFromURL("created", "true");
    } else {
      modifyQueryFromURL("created", false);
    }

    setCreated(newCreatedValue);
    dispatch(filterDogs("rerender", newCreatedValue));
  };

  const filterHandler = ({ target: { value } }) => {
    // Modifica la URL
    if (value === "Show all") {
      modifyQueryFromURL("filter", false);
    } else {
      modifyQueryFromURL("filter", value);
    }

    dispatch(filterDogs(value, created));
    setSelected(value);
  };

  return (
    <div className={styles.filterContainer}>
      {createdDogs.length > 0 && (
        <label htmlFor="NoCreated" className={styles.label}>
          <input
            onChange={createdHandler}
            type="checkbox"
            id="NoCreated"
            checked={created}
            className={styles.checkbox}
          />
          Created only
        </label>
      )}
      <select
        onChange={filterHandler}
        name="filter"
        id="filter"
        value={selected}
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
