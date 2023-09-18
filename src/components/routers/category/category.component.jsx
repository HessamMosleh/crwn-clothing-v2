import {useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import ProductCard from "../../product-card/product-card.component";
import './category.styles.scss'
import {useSelector} from "react-redux";
import {selectCategoriesIsLoading, selectCategoriesMap} from "../../../store/category/category.selector";
import Spinner from "../../spinner/spinner.component";

const Category = () => {

    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <Fragment>
            {isLoading ? <Spinner/> :
                <Fragment>
                    <h2 className='category-title'>{category.toUpperCase()}</h2>
                    <div className='category-container'>
                        {products &&
                            products.map(product =>
                                <ProductCard key={product.id} product={product}/>)
                        }
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}
export default Category;