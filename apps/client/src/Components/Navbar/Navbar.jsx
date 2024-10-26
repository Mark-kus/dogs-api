import Searchbar from "../SearchBar/SearchBar.jsx";
import styles from "./Navbar.module.css";

import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <h1 className={styles.title}>Dog Web Page</h1>

      <NavLink
        className={({ isActive }) => (isActive ? styles.active : styles.links)}
        to="/dogs"
      >
        Dogs
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : styles.links)}
        to="/new"
      >
        New Breed
      </NavLink>

      <Searchbar />
    </nav>
  );
}
