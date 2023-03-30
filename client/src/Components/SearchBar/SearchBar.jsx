// SearchBar: un input de búsqueda para encontrar razas de perros por nombre.

export default function Searchbar () {
    return (
        <div>
        <label htmlFor="raceName">Race name</label>
        <input id="raceName" type="text" name="raceName" />
        </div>
    )
}