import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import { useFilterContext } from '@/FilterContext';
import styles from '../styles/CarDetails.module.css';

const CarDetails = () => {
    const [car, setCar] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    const { currentPage, queryParams } = useFilterContext();

    useEffect(() => {
        if (id) {
            axios.get(`https://test.taxivoshod.ru/api/test/?w=catalog-car&id=${id}`)
                .then(response => {
                    if (response.data.result === 1 && response.data.item) {
                        setCar(response.data.item);
                    }
                })
                .catch(error => console.error('Error fetching car details:', error));
        }
    }, [id]);

    if (!car) return <div className={styles.loader}>Loading...</div>;

    const handleBack = () => {
        const fullUrl = `/?${queryParams}&page=${currentPage}`;
        router.push(fullUrl);
    };

    return (
        <div className={styles.root}>
            <div className={styles.carCard}>
                <h1>{car.brand} {car.model}</h1>
                {car.number && <p>Номер: {car.number}</p>}
                <p>Цена: {car.price ? `${car.price.toLocaleString()} RUB` : 'Цена по запросу'}</p>
                <p>Тариф: {car.tarif.join(', ') || 'не указан'}</p>
                <div className={styles.slider}>
                    {car.images !== null && car.images.length > 0 && (
                        <ImageSlider images={car.images.map(image => image.image)} />
                    )}
                </div>
                <button onClick={handleBack} className={styles.button}>Назад</button>
            </div>
        </div>
    );
};

export default CarDetails;
