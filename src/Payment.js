import React,{ useState,useEffect } from 'react'
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { useStateValue } from "./Stateprovider";
import { Link,useHistory } from "react-router-dom";
import { CardElement, useStripe,useElements } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import axios from './axios'
import { db } from './firebase'
function Payment() {
    const history = useHistory()
    const [{basket, user},dispatch] = useStateValue()
     const stripe = useStripe();
     const elements = useElements();

     const [processing, setprocessing] = useState("")
     const [succeeded, setsucceeded] = useState(false)
     const [error, setError] = useState(null)
     const [disabled, setDisabled] = useState(true)
     const [ClientSecret, setClientSecret] = useState(true)

     useEffect(() => {
         //generates a special stripe which allows us to charge a customer
         const getClientSeret = async() =>{
             const response = await axios({
                 method:'post',
                 //stripe expects the total in a currencies subtotal
                 url:`/payments/create?total=${getBasketTotal(basket)* 100}`
             });
             setClientSecret(response.data.ClientSecret)
         }
         getClientSeret()
     }, [basket])

            console.log('THE SECRET IS >>>', ClientSecret)
            console.log('👱', user)

     const handleSubmit = async (e) =>{
         e.preventDefault();
         setprocessing(true);
        
         const payload = await stripe.confirmCardPayment(ClientSecret, {
             payment_method:{
                 card:elements.getElement(CardElement)
             }
         }).then(({ paymentIntent})=>{
             //paymentIntent = payment confirmation

             db
             .collection('users')
             .doc(user?.uid)
             .collection('orders')
             .doc(paymentIntent.id)
             .set({
                 basket: basket,
                 amount: paymentIntent.amount,
                 created: paymentIntent.created
             })

             setsucceeded(true)
             setError(null)
             setprocessing(false)

            //  dispatch({
            //      type: "EMPTY_BASKET"
            //  })
             history.replace('/Orders')
         })
     }

     const handleChange = (e) =>{
         //Listen for changes in CardElement
         //and display any errors as the customer types their card details
         setDisabled(e.empty);
         setError(e.error ? e.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment__container'>

                <h1>
                Checkout (
                        <Link to="/Checkout">{basket?.length} items</Link>
                        )
                </h1>

                {/* payement section - delivery address */}

                <div className="payment__section">
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123, React Lane</p>
                        <p>LOs Angeles, CA</p>
                    </div>
                </div>

                {/* payement section - review items */}

                <div className="payment__section">
                    <div className='payment__title'>
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {
                            basket.map(item=>(
                                <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                />
                            ))
                        }
                    </div>
                </div>

                {/* payement section - payment method */}

                <div className="payment__section">
                    <div className='payment__title'>
                        <h3>Pyment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className="payment__priceCotainer">
                                <CurrencyFormat 
                                     renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)} // Part of the homework
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                     <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {/* Error */}
                                     {error && <div>{error}</div>}
                        </form>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Payment
