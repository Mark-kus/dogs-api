// Cuando se le hace click a una Card deberá redirigir al detalle de esa raza específica.
// Botones/Opciones para filtrar por temperamentos,
// y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perros por orden alfabético y por peso.
// Paginado: el listado de razas de perros se hará por partes.

import styles from './Card.module.css';

import { Link } from 'react-router-dom';

export default function Card({ dog }) {
    return (
        <article>
            <Link to={`/dogs/${dog.id}`}>
                <img src={dog.image.url} className={styles.dogExample} alt={`${dog.name} example`} />
            </Link>

            <h3>
                {dog.name}
            </h3>

            <div>
                {dog.temperament ? dog.temperament : 'These dog has no temperament assigned'}
                <br />
                {dog.weight.metric} kg / {dog.weight.imperial} lb
            </div>
        </article>
    )
}