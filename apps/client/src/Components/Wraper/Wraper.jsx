import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Wraper.module.css";

import Card from "../Card/Card";
import Filter from "../OrderFilter/Filter.jsx";
import Order from "../OrderFilter/Order.jsx";
import pagination from "../../Redux/actions/dogs/pagination";
import Loader from "../Loader/Loader";

import { useAppDispatch, useAppSelector } from "../../Redux/hooks.js";

import getAllDogs from "../../Redux/actions/dogs/getAllDogs";
import getAllTemps from "../../Redux/actions/temperaments/getAllTemps";
import toggleFetching from "../../Redux/actions/dogs/toggleFetching";

function Pagination({
  startHandler,
  prevHandler,
  nextHandler,
  endHandler,
  currentPage,
  disableNext,
  disablePrev,
}) {
  return (
    <div className={styles.pagination}>
      <button
        disabled={disablePrev}
        className={styles.finalPagination}
        onClick={startHandler}
      >
        &lArr;
      </button>
      <button disabled={disablePrev} onClick={prevHandler}>
        &lt;
      </button>
      <h4 className={styles.paginationText}>Page {currentPage}</h4>
      <button disabled={disableNext} onClick={nextHandler}>
        &gt;
      </button>
      <button
        disabled={disableNext}
        className={styles.finalPagination}
        onClick={endHandler}
      >
        &rArr;
      </button>
    </div>
  );
}

export default function Wraper() {
  const shownDogs = useAppSelector((state) => state.shownDogs);
  const currentPage = useAppSelector((state) => state.currentPage);
  const itemsPerPage = useAppSelector((state) => state.itemsPerPage);
  const dogsQty = useAppSelector((state) => state.dogsQty);
  const fetching = useAppSelector((state) => state.fetching);
  const allDogs = useAppSelector((state) => state.allDogs);
  const allTemps = useAppSelector((state) => state.allTemps);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!allDogs.length) {
      if (!fetching) dispatch(toggleFetching());
      dispatch(getAllDogs()).catch((e) => {
        if (e.response.status === 400) navigate("/error");
      });
    }
    if (!allTemps.length) {
      dispatch(getAllTemps());
    }

    if (allDogs.length && allTemps.length && fetching) {
      dispatch(toggleFetching());
    }
  }, [dispatch, allDogs.length, allTemps.length, navigate]);

  // Página inicial
  const startHandler = () => {
    dispatch(pagination("start"));
    scrollToTop();
  };

  // Página final
  const endHandler = () => {
    dispatch(pagination("end"));
    scrollToTop();
  };

  // Página anterior
  const prevHandler = () => {
    if (currentPage === 1) return;
    dispatch(pagination("prev"));
    scrollToTop();
  };

  // Página siguiente
  const nextHandler = () => {
    if (currentPage * itemsPerPage >= dogsQty) return;
    dispatch(pagination("next"));
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.orderFilter}>
        <Order />
        <Pagination
          startHandler={startHandler}
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          endHandler={endHandler}
          currentPage={currentPage}
          disableNext={currentPage * itemsPerPage >= dogsQty}
          disablePrev={currentPage === 1}
        />
        <Filter />
      </div>
      {fetching ? (
        <Loader />
      ) : shownDogs.length > 0 ? (
        <section>
          {shownDogs.map((dog) => (
            <Card key={dog.id} dog={dog} />
          ))}
        </section>
      ) : (
        <h1>No dogs found</h1>
      )}
      <div className={styles.orderFilter}>
        <Pagination
          startHandler={startHandler}
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          endHandler={endHandler}
          currentPage={currentPage}
          disableNext={currentPage * itemsPerPage >= dogsQty}
          disablePrev={currentPage === 1}
        />
      </div>
    </div>
  );
}
