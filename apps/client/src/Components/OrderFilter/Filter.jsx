import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import filterDogs from '../../Redux/actions/dogs/filterDogs';

export default function Filter() {
    const dispatch = useDispatch();
    const { allTemps } = useSelector(state => state);
    const [created, setCreated] = useState(false)

    const createdHandler = () => {
        setCreated(!created);
        dispatch(filterDogs('rerender', !created));
    }

    const filterHandler = (e) => {
        dispatch(filterDogs(e.target.value, created))
    }

    return (
        <div>
            <label htmlFor="NoCreated">Only created</label>
            <input onChange={createdHandler} type="checkbox" id="NoCreated" />
            <select onChange={filterHandler} name="filter" id="filter">
                <option value="Show all">Show all</option>
                {allTemps?.map((temp, i) => (
                    <option key={i} value={temp}>{temp}</option>
                ))}
            </select>
        </div>
    )
}