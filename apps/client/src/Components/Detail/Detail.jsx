import styles from "./Detail.module.css";
import Loader from "../Loader/Loader";
import deleteDog from "../../Redux/actions/dogs/deleteDog";

import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toggleFetching from "../../Redux/actions/dogs/toggleFetching";
import getDogById from "../../Redux/actions/dogs/getDogById";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";

export default function Detail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const detailDog = useAppSelector((state) => state.detailDog);
  const fetching = useAppSelector((state) => state.fetching);

  const { pathname } = location;
  const id = pathname.slice(6);

  const [minWeight, maxWeight] = detailDog.weight
    ? detailDog.weight.split(" - ")
    : ["", ""];
  const [minHeight, maxHeight] = detailDog.height
    ? detailDog.height.split(" - ")
    : ["", ""];
  const [minLifeSpan, maxLifeSpan] = detailDog.lifespan
    ? detailDog.lifespan.split(" - ")
    : ["", ""];

  useEffect(() => {
    if (!id) {
      navigate("/error");
      return;
    }

    if (String(detailDog.id) !== String(id)) {
      dispatch(getDogById(id))
        .catch((e) => {
          if (e.response.status === 400) navigate("/error");
        })
        .finally(() => {
          dispatch(toggleFetching());
        });
    }
  }, [id, dispatch, detailDog.id]);

  const deleteCard = () => {
    dispatch(deleteDog(detailDog.id));
    navigate("/dogs");
  };

  return (
    <>
      {fetching ? (
        <section className={styles.detail}>
          <div className={styles.buttons}>
            <Link to="/dogs" className={styles.button}>
              Return
            </Link>
            {detailDog.created ? (
              <button onClick={deleteCard} className={styles.button}>
                Delete
              </button>
            ) : (
              ""
            )}
          </div>

          <img
            src={detailDog.image}
            className={styles.dogBigExample}
            alt={`${detailDog.name} example`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/placeholder-dog.png";
            }}
          />

          <div className={styles.data}>
            <div className={styles.topData}>
              <h2>{detailDog.name}</h2>
              <span>{detailDog.id}</span>
            </div>

            <div className={styles.bottomData}>
              <p>
                Height
                <span>
                  <span>{minHeight} cm</span>
                  {maxHeight && <span> - {maxHeight} cm</span>}
                </span>
              </p>
              <p>
                Life span
                <span>
                  <span>
                    {minLifeSpan}
                    {minLifeSpan.includes("years") ? "" : " years"}
                  </span>
                  {maxLifeSpan && (
                    <span>
                      {" "}
                      - {maxLifeSpan}
                      {maxLifeSpan.includes("years") ? "" : " years"}
                    </span>
                  )}
                </span>
              </p>
              <p>
                Weight
                {Boolean(minWeight) && Boolean(maxWeight) ? (
                  <span>
                    <span>{minWeight} kg</span>
                    {maxWeight && <span> - {maxWeight} kg</span>}
                  </span>
                ) : (
                  "Not specified"
                )}
              </p>
            </div>

            <p>{detailDog.temperament}</p>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}
