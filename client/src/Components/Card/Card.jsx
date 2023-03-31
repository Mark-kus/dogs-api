// Cuando se le hace click a una Card deberá redirigir al detalle de esa raza específica.
// Botones/Opciones para filtrar por temperamentos,
// y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perros por orden alfabético y por peso.
// Paginado: el listado de razas de perros se hará por partes.
// Tu SPA debe contar con un paginado que muestre un total de 8 perros por página.

import styles from './Card.module.css';

export default function Card({ dog }) {
    return (
        <article>
            <header>
                {dog.name}
            </header>
            <img src={dog.image.url} alt={`${dog.name} example`} />
            <div>
            Temperament: {dog.temperament}
            <br />
            {dog.weight.metric} Kilograms
            </div>
        </article>
    )
}