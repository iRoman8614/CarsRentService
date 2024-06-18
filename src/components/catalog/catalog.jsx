import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import CarList from "@/components/carList/CarList";
import { useFilterContext } from '@/FilterContext';

import styles from './catalog.module.css';
import customStyles from "@/components/catalog/selectStyles";

const Catalog = () => {
    const [filters, setFilters] = useState({ brands: [], models: [], tarifs: [] });
    const {
        selectedBrands, setSelectedBrands,
        selectedModels, setSelectedModels,
        selectedTarifs, setSelectedTarifs
    } = useFilterContext();

    useEffect(() => {
        const fetchFilters = async () => {
            const response = await axios.get('https://test.taxivoshod.ru/api/test/?w=catalog-filter');
            if (response.data.result === 1) {
                setFilters({
                    brands: response.data.brands.values.map(brand => ({ label: brand, value: brand })),
                    models: response.data.models.values.flatMap(item =>
                        item.models.map(model => ({ label: model, value: model, linkedBrand: item.brand }))
                    ),
                    tarifs: Object.entries(response.data.tarif.values).map(([key, value]) => ({
                        label: value,
                        value: key
                    }))
                });
            }
        };

        fetchFilters();
    }, []);

    const handleBrandChange = (selectedOptions) => {
        setSelectedBrands(selectedOptions || []);
    };

    const handleModelChange = (selectedOptions) => {
        setSelectedModels(selectedOptions || []);
    };

    const handleTarifChange = (selectedOptions) => {
        setSelectedTarifs(selectedOptions || []);
    };

    return (
        <div className={styles.root}>
            <h1>Каталог машин</h1>
            <div className={styles.container}>
                <div className={styles.selector}>
                    <h2 className={styles.title}>Бренды</h2>
                    <Select
                        styles={customStyles}
                        options={filters.brands}
                        isMulti
                        onChange={handleBrandChange}
                        value={selectedBrands}
                        placeholder="Выберите бренды..."
                    />
                </div>
                <div className={styles.selector}>
                    <h2 className={styles.title}>Модели</h2>
                    <Select
                        styles={customStyles}
                        options={filters.models.filter(model => selectedBrands.length === 0 || selectedBrands.map(b => b.value).includes(model.linkedBrand))}
                        isMulti
                        onChange={handleModelChange}
                        value={selectedModels}
                        placeholder="Выберите модели..."
                    />
                </div>
                <div className={styles.selector}>
                    <h2 className={styles.title}>Тарифы</h2>
                    <Select
                        styles={customStyles}
                        options={filters.tarifs}
                        isMulti
                        onChange={handleTarifChange}
                        value={selectedTarifs}
                        placeholder="Выберите тарифы..."
                    />
                </div>
            </div>
            <CarList />
        </div>
    );
};

export default Catalog;
