import React from 'react'
import './Product.css'
import { useStateValue } from './Stateprovider'
function Product({id,title,price,image,rating}) {
    const [{basket},dispatch] = useStateValue()
    const AddToBasket = ()=>{
        dispatch({
            type:"ADD_TO_BASKET",
            item:{
                id:id,
                title:title,
                price:price,
                image:image,
                rating:rating
            }
        })
    }
    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {
                        Array(rating).fill().map((_,i)=>(
                            <p>🌟</p>
                        ))
                    }
                </div>
            </div>
            <img src={image}
            alt="Product_1" />
            <button onClick={AddToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
