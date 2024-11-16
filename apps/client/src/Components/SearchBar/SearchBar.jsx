// SearchBar: un input de búsqueda para encontrar razas de perros por nombre.
import styles from "./SearchBar.module.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import getDogByName from "../../Redux/actions/dogs/getDogByName";
import clearSearch from "../../Redux/actions/dogs/clearSearch";

export default function Searchbar() {
  const dispatch = useAppDispatch();
  const searchDogs = useAppSelector((state) => state.searchDogs);
  let shownList = [...searchDogs].splice(0, 8);
  const [input, setInput] = useState("");
  const [searching, setSearching] = useState(false);

  const searchHandler = (() => {
    let currentFetch = null;

    return async ({ target: { value } }) => {
      if (currentFetch) {
        currentFetch.abort();
      }

      setSearching(true);
      setInput(value);

      const controller = new AbortController();
      const signal = controller.signal;
      currentFetch = controller;

      try {
        await dispatch(getDogByName(value, { signal }));
        shownList = [...searchDogs].splice(0, 8);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
        }
      } finally {
        setSearching(false);
        currentFetch = null;
      }
    };
  })();

  const selectHandler = (e) => {
    if (e.target.tag !== "li") {
      setInput("");
      dispatch(clearSearch());
    }
  };

  return (
    <div className={styles.searchbar}>
      <input
        value={input}
        placeholder="Search for a breed"
        onChange={searchHandler}
        id="breed"
        type="text"
        name="breed"
        aria-autocomplete="both"
        aria-label="Search for breed"
      />
      <ul role="listbox" className={styles.list} aria-label="Search for breed">
        {!input ? (
          <li className={styles.linknt}>Start typing to find breeds!</li>
        ) : searching ? (
          <li className={styles.loader}></li>
        ) : shownList.length ? (
          shownList.map((dog) => (
            <Link
              key={dog.id}
              className={styles.link}
              to={`/dogs/${dog.id}`}
              role="option"
              onClick={selectHandler}
            >
              {dog.name}
            </Link>
          ))
        ) : (
          <li className={styles.linknt}>No breeds found, try again!</li>
        )}
      </ul>
    </div>
  );
}
