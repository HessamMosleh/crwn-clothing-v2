import {Fragment, useContext} from 'react'
import {CategoriesContext} from "../../../contexts/categories.context";
import ProductCard from "../../product-card/product-card.component";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectFixCategories} from "../../../store/category/category.selector";
const CategoriesPreview = () => {
    const categoriesMap= useSelector(state =>selectFixCategories(state,4));
    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map(key=>{
                    return(
                        <Fragment>
                            <h1>
                                <Link to={key}>
                                <span className='title'>{key}</span>
                                </Link>
                            </h1>
                            <div className='products-container'>
                                {categoriesMap[key].map(product =>
                                    (
                                        <ProductCard key={product.id} product={product}/>
                                    ))}
                            </div>
                        </Fragment>
                    )
                })
            }
        </Fragment>


    )
}

export default CategoriesPreview;