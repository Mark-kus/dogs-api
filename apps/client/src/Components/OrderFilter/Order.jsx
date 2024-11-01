import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../Redux/hooks.js";
import orderDogs from "../../Redux/actions/dogs/orderDogs.js";

import styles from "./Order.module.css";

export default function Order() {
  const dispatch = useAppDispatch();
  const { allDogs } = useAppSelector((state) => state);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const order = queryParams.get("order");
    if (order && allDogs.length) {
      dispatch(orderDogs(order));
    }
  }, [location.search, dispatch, allDogs.length]);

  const orderHandler = (e) => {
    // Modifica la URL
    if (e.target.value !== "NAscendente") {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set("order", e.target.value);
      window.history.pushState(
        null,
        "",
        `${location.pathname}?${queryParams.toString()}`
      );
    } else {
      const queryParams = new URLSearchParams(location.search);
      queryParams.delete("order");
      window.history.pushState(
        null,
        "",
        `${location.pathname}?${queryParams.toString()}`
      );
    }

    dispatch(orderDogs(e.target.value));
  };

  return (
    <div className={styles.orderContainer}>
      <select
        onChange={orderHandler}
        name="order"
        id="order"
        className={styles.orderSelect}
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
