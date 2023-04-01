import styles from './Detail.module.css';

export default function Detail({ dog }) {

    
    return (
        <>
        {dog.id}
        {dog.name}
        {dog.height}
        {dog.weight}
        {dog.temperament}
        {dog.life_span}
        <img src={dog.image.url} className={styles.dogBigExample} alt={`${dog.name} example`} />
        </>
    )
}