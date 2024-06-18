import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);
    const [selectedTarifs, setSelectedTarifs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [queryParams, setQueryParams] = useState('');
    const router = useRouter();

    useEffect(() => {
        const savedFilters = JSON.parse(sessionStorage.getItem('filters'));
        if (savedFilters) {
            setSelectedBrands(savedFilters.selectedBrands);
            setSelectedModels(savedFilters.selectedModels);
            setSelectedTarifs(savedFilters.selectedTarifs);
            setCurrentPage(savedFilters.currentPage);
        }
    }, []);

    useEffect(() => {
        const brands = selectedBrands.map(b => `brand[]=${encodeURIComponent(b.value)}`).join('&');
        const models = selectedModels.map(m => `model[]=${encodeURIComponent(m.value)}`).join('&');
        const tarifs = selectedTarifs.map(t => `tarif[]=${encodeURIComponent(t.value)}`).join('&');

        const params = [brands, models, tarifs].filter(Boolean).join('&');
        setQueryParams(params ? `&${params}` : '');

        sessionStorage.setItem('filters', JSON.stringify({
            selectedBrands,
            selectedModels,
            selectedTarifs,
            currentPage
        }));

        const fullUrl = `/?${params}&page=${currentPage}`;
        router.push(fullUrl, undefined, { shallow: true });
        sessionStorage.setItem('lastCatalogUrl', fullUrl);

    }, [selectedBrands, selectedModels, selectedTarifs, currentPage]);

    return (
        <FilterContext.Provider value={{
            selectedBrands, setSelectedBrands,
            selectedModels, setSelectedModels,
            selectedTarifs, setSelectedTarifs,
            currentPage, setCurrentPage,
            queryParams
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => useContext(FilterContext);
