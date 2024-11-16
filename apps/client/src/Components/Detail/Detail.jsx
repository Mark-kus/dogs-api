import styles from "./Detail.module.css";
import Loader from "../Loader/Loader";
import deleteDog from "../../Redux/actions/dogs/deleteDog";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Detail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const detailDog = useSelector((state) => state.detailDog);
  const [load, setLoad] = useState(false);

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
    if (detailDog.id) setLoad(true);
  }, [detailDog]);

  const deleteCard = () => {
    dispatch(deleteDog(detailDog.id));
    navigate("/dogs");
  };

  return (
    <>
      {load ? (
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
                <div>
                  <span>{minHeight} cm</span>
                  {maxHeight && <span> - {maxHeight} cm</span>}
                </div>
              </p>
              <p>
                Life span
                <div>
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
                </div>
              </p>
              <p>
                Weight
                {Boolean(minWeight) && Boolean(maxWeight) ? (
                  <div>
                    <span>{minWeight} kg</span>
                    {maxWeight && <span> - {maxWeight} kg</span>}
                  </div>
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
