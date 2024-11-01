import styles from "./Card.module.css";

import { Link } from "react-router-dom";

export default function Card({ dog }) {
  return (
    <article className={styles.article}>
      <Link to={`/dogs/${dog.id}`}>
        <picture className={styles.picture}>
          <img
            src={dog?.image}
            className={styles.image}
            alt={`${dog.name} example`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/placeholder-dog.png";
            }}
          />
        </picture>
      </Link>

      <h3 className={styles.dogName}>{dog.name}</h3>

      <div className={styles.info}>
        {dog.temperament ? dog.temperament : "No temperament assigned"}
        <br />
        {!dog.weight.includes("NaN")
          ? `${dog.weight} kg`
          : "No weight assigned"}
      </div>
    </article>
  );
}
