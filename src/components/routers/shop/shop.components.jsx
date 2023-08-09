import {Routes, Route} from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories.preview.component';
import Category from "../category/category.component";

import './shop.syles.scss'
import {useEffect} from "react";
import {getCategoriesAndDocuments} from "../../../utils/firebase/firebase.utils";
import {setCategories} from "../../../store/category/category.action";
import {useDispatch} from "react-redux";

const Shop = () => {
    const dispatch = useDispatch();

    //GET CATEGORIES MAP
    useEffect(() => {
        async function runFunc() {
            const categories = await getCategoriesAndDocuments();
            dispatch(setCategories(categories))
        }

        runFunc()
    }, [])

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=':category' element={<Category/>}/>
        </Routes>
    );
};
export default Shop;