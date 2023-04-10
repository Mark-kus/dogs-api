import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import filterDogs from '../../Redux/actions/dogs/filterDogs';

export default function Filter() {
    const dispatch = useDispatch();
    const { allTemps } = useSelector(state => state);

    const reorder = () => {
        // dispatch(pagination('reset'));
        // dogsQty = shownDogs.length;
    }

    const filterHandler = (e) => {
        console.dir(e.target);
        dispatch(filterDogs(e.target.value))
    }

    return (
        <div>
            <label htmlFor="NoCreated">Only created</label>
            <input onChange={filterHandler} type="checkbox" name="NoCreated" id="NoCreated" />
            <select onChange={filterHandler} name="filter" id="filter">
                <option value="Show all">Show all</option>
                {allTemps?.map((temp, i) => (
                    <option key={i} value={temp}>{temp}</option>
                ))}
            </select>
        </div>
    )
}