import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../Redux/hooks.js";
import orderDogs from "../../Redux/actions/dogs/orderDogs.js";

import styles from "./Order.module.css";
import { modifyQueryFromURL } from "./utils.js";

export default function Order() {
  const dispatch = useAppDispatch();
  const allDogs = useAppSelector((state) => state.allDogs);
  const location = useLocation();
  const [selected, setSelected] = useState("NAscendente");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const order = queryParams.get("order");
    if (order) {
      setSelected(order);
      if (allDogs.length) {
        dispatch(orderDogs(order));
      }
    }
  }, [location.search, dispatch, allDogs.length]);

  const orderHandler = ({ target: { value } }) => {
    // Modifica la URL
    if (value !== "NAscendente") {
      modifyQueryFromURL("order", value);
    } else {
      modifyQueryFromURL("order", false);
    }

    setSelected(value);
    dispatch(orderDogs(value));
  };

  return (
    <div className={styles.orderContainer}>
      <select
        onChange={orderHandler}
        name="order"
        id="order"
        className={styles.orderSelect}
        value={selected}
      >
        <option value="NAscendente" className={styles.orderOption}>
          Name Ascending
        </option>
        <option value="NDescendente" className={styles.orderOption}>
          Name Descending
        </option>
        <option value="WAscendente" className={styles.orderOption}>
          Weight Ascending
        </option>
        <option value="WDescendente" className={styles.orderOption}>
          Weight Descending
        </option>
      </select>
    </div>
  );
}
