import {createContext, useEffect, useState} from 'react'
import {getCategoriesAndDocuments} from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
    categoriesMap: null,
    setCategoriesMap: () => {},
    getFixedCountCategoriesMap: (count) => {
    }
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    useEffect(() => {
        async function runFunc() {
            const categoryMaps = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMaps)
        }

        runFunc()
    }, [])

    const getFixedCountCategoriesMap = (count) => {
        let result = {};
        Object.keys(categoriesMap).forEach(key => {
           result ={[key]: categoriesMap[key].slice(0, count), ...result}
        })
        return result;
    }
    const value = {categoriesMap, setCategoriesMap, getFixedCountCategoriesMap};

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}