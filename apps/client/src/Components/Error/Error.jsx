import React, { useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { useNavigate } from "react-router-dom";
import styles from "./Error.module.css";
import getAllDogs from "../../Redux/actions/dogs/getAllDogs";

const Error = ({ errorMessage = "Something went wrong. Please try again later." }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [rebooting, setRebooting] = useState(false);

  const handleReboot = () => {
    setRebooting(true);
    dispatch(getAllDogs())
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setRebooting(false);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Oops!</h1>
      <p className={styles.message}>{errorMessage}</p>
      <div className={styles.actions}>
        <button
          className={`${styles.button} ${rebooting ? styles.disabled : ""}`}
          onClick={handleReboot}
          disabled={rebooting}
        >
          {rebooting ? "Rebooting..." : "Try Again"}
        </button>
      </div>
    </div>
  );
};

export default Error;
