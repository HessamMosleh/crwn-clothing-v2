import {Route, Routes} from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories.preview.component';
import Category from "../category/category.component";

import './shop.syles.scss'
import {useEffect} from "react";
import {fetchCategoriesAsync} from "../../../store/category/category.action";
import {useDispatch} from "react-redux";

const Shop = () => {
    const dispatch = useDispatch();

    //GET CATEGORIES MAP
    useEffect(() => {
            dispatch(fetchCategoriesAsync())
    }, [])

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=':category' element={<Category/>}/>
        </Routes>
    );
};
export default Shop;