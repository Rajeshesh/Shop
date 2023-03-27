import { Button } from "@mui/material"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import {
    CardNumberElement, CardExpiryElement, CardCvcElement
} from "@stripe/react-stripe-js"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createOrder } from "../../actions/orderAction"
import { orderCompleted } from "../../slices/cartSlice"
import { clearError as clearOrderError } from "../../slices/orderSlice"
import CheckoutSteps from "./CheckoutSteps"
import { validateShipping } from "./Shipping"


export default function Payment() {

    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const { user } = useSelector(state => state.authState)
    const { items: cartItems, shippingInfo } = useSelector(state => state.cartState)
    const { error: orderError } = useSelector(state => state.orderState)
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
        shipping: {
            name: user.name,
            address: {
                city: shippingInfo.city,
                postal_code: shippingInfo.postalCode,
                country: shippingInfo.country,
                state: shippingInfo.state,
                line1: shippingInfo.address
            },
            phone: shippingInfo.phoneNo
        }
    }

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice

    }

    useEffect(() => {

        validateShipping(shippingInfo, navigate)
        if (orderError) {
            toast(orderError, {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearOrderError())
            })
        }

    })

    const submitHandler = async (e) => {
        e.preventDefault()
        document.querySelector('#pay_btn').disabled = true
        try {
            const { data } = await axios.post('/api/v1/payment/process', paymentData)
            const clientSecret = data.client_secret
            const result = stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if ((await result).error) {
                toast((await result).error.message, {
                    type: 'error',
                    position: toast.POSITION.BOTTOM_CENTER
                })
                document.querySelector('#pay_btn').disabled = false

            } else {
                if ((await result).paymentIntent.status === "succeeded") {
                    toast('Payment Success', {
                        type: 'success',
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                    order.paymentInfo = {
                        id: (await result).paymentIntent.id,
                        status: (await result).paymentIntent.status
                    }
                    dispatch(orderCompleted())
                    dispatch(createOrder(order))
                    navigate('/order/success')

                } else {
                    toast('Please try again!', {
                        type: 'warning',
                        position: toast.POSITION.BOTTOM_CENTER

                    })
                }
            }



        } catch (error) {

        }

    }





    return (
        <div className="mt-16">
            <CheckoutSteps confirmOrder shipping payment={true}/>

            <div className="input">
                <form onSubmit={submitHandler} className="input__form">
                    <h1 className="mb-4">Card Info</h1>
                    <div className="form-group">
                        <label htmlFor="card_num_field">Card Number</label>
                        <CardNumberElement
                            type="text"
                            id="card_num_field"
                            className="form-control"
                            value="" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="card_exp_field">Card Expiry</label>
                        <CardExpiryElement
                            type="text"
                            id="card_exp_field"
                            className="form-control"
                            value="" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="card_cvc_field">Card CVC</label>
                        <CardCvcElement
                            type="text"
                            id="card_cvc_field"
                            className="form-control"
                            value="" />
                    </div>


                    <Button variant="contained" id="pay_btn" type="submit" className=" mt-5">
                        Pay={`$${orderInfo && orderInfo.totalPrice}`}
                    </Button>

                </form>
            </div>
        </div>
    )
}