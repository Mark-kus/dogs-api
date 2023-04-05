import { useDispatch, useSelector } from "react-redux";

// import filterDogs from '../../Redux/actions/dogs/filterDogs';

export default function () {
    const dispatch = useDispatch();
    const { allTemps } = useSelector(state => state);

    const filterHandler = (e) => {
        // dispatch(filterDogs(e.target.value));
    }

    return (
        <>
            <select onChange={filterHandler} name="filter" id="filter">
                <option value="Show all">Show all</option>
                <option value="Created">Created</option>
                <option value="Not created">Not created</option>
                {allTemps?.map((temp, i) => (
                    <option key={i} value={temp}>{temp}</option>
                ))}
            </select>
        </>
    )
}