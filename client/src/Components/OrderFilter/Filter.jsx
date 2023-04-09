import { useDispatch, useSelector } from "react-redux";

import filterDogs from '../../Redux/actions/dogs/filterDogs';

export default function Filter({ reorder }) {
    const dispatch = useDispatch();
    const { allTemps } = useSelector(state => state);

    const filterHandler = (e) => {
        dispatch(filterDogs(e.target.value));
        reorder();
    }

    return (
        <>
            <select onChange={filterHandler} name="filter" id="filter">
                <option value="Show all">Show all</option>
                {allTemps?.map((temp, i) => (
                    <option key={i} value={temp}>{temp}</option>
                ))}
            </select>
            {/* <input type="checkbox" name="NoCreated" id="NoCreated" />
            <input type="checkbox" name="AllCreated" id="AllCreated" /> */}
        </>
    )
}