import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFilterContext } from '@/FilterContext';

import styles from './CarList.module.css';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { currentPage, setCurrentPage, queryParams } = useFilterContext();
    const [totalPages, setTotalPages] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchCars = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://test.taxivoshod.ru/api/test/?w=catalog-cars${queryParams}&page=${currentPage}`);
                if (response.data.result === 1) {
                    setCars(response.data.list);
                    setTotalPages(response.data.pages);
                }
            } catch (error) {
                console.error("Failed to fetch cars:", error);
            }
            setIsLoading(false);
        };

        fetchCars();
    }, [queryParams, currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (isLoading) return <div className={styles.loader}>Loading...</div>;
    if (cars.length === 0) return <p>No cars found.</p>;

    return (
        <div>
            <div className={styles.root}>
                {cars.map(car => (
                    <Link className={styles.link} key={car.id} href={`/${car.id}`} passHref>
                        <div className={styles.carCard}>
                            <img src={car.image || 'default_car_image.webp'} alt={`${car.brand} ${car.model}`} className={styles.carImage} />
                            <div className={styles.carInfo}>
                                <h3>{car.brand} {car.model}</h3>
                                <p>Номер машины: {car.number}</p>
                                <p>Цена: {car.price > 0 ? `${car.price.toLocaleString()} RUB` : 'Цена по запросу'}</p>
                                {car.tarif.length > 0 && <p>Тариф: {car.tarif}</p>}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Назад
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? styles.active : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Вперед
                    </button>
                </div>
            )}
        </div>
    );
};

export default CarList;
