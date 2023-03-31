// Este formulario debe ser controlado completamente con JavaScritp.
// Posibilidad de seleccionar/agregar varios temperamentos en simultáneo.
import styles from './Form.module.css';

export default function Form() {
    return (
        <form>
            <label htmlFor="name">Name</label>
            <input type="text" id='name' />

            <label htmlFor="minHeight">Min-height</label>
            <input type="text" id='minHeight' />
            <label htmlFor="maxHeight">Max-height</label>
            <input type="text" id='maxHeight' />

            <label htmlFor="minWeight">Min-weight</label>
            <input type="text" id='minWeight' />
            <label htmlFor="maxWeight">Max-weight</label>
            <input type="text" id='maxWeight' />

            <label htmlFor="lifespan">Lifespan</label>
            <input type="text" id='lifespan' />

            <label htmlFor=""></label>
            <input type="text" id='' />

            <button type='submit'>Submit dog</button>
        </form>
    )
}