import styles from "./Wraper.module.css";

import Card from "../Card/Card";
import Filter from "../OrderFilter/Filter.jsx";
import Order from "../OrderFilter/Order.jsx";
import pagination from "../../Redux/actions/dogs/pagination";
import Loader from "../Loader/Loader";

import { useAppDispatch, useAppSelector } from "../../Redux/hooks.js";

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
  const dispatch = useAppDispatch();

  // Página inicial
  const startHandler = () => {
    dispatch(pagination("start"));
  };

  // Página final
  const endHandler = () => {
    dispatch(pagination("end"));
  };

  // Página anterior
  const prevHandler = () => {
    if (currentPage === 1) return;
    dispatch(pagination("prev"));
  };

  // Página siguiente
  const nextHandler = () => {
    if (currentPage * itemsPerPage >= dogsQty) return;
    dispatch(pagination("next"));
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
