import MetaData from "../layouts/MetaData";
import React, { useEffect } from "react";
import { validateShipping } from "./Shipping";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { Button } from "@mui/material";


export default function ConfirmOrder() {

    const { shippingInfo, items: cartItems } = useSelector(state => state.cartState)
    const { user } = useSelector(state => state.authState)
    const navigate = useNavigate()

    const itemsPrice = cartItems.reduce((acc, item) => (acc + item.price * item.quantity), 0)
    const shippingPrice = itemsPrice > 499 ? 0 : 50;
    let taxPrice = Number(0.05 * itemsPrice)
    const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2)
    taxPrice = Number(0.05 * itemsPrice).toFixed(2)

    useEffect(() => {
        validateShipping(shippingInfo, navigate)
    }, [])

    const processPayment = () => {
        const data = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate("/payment")
    }

    return (
        <>
            <MetaData title={'Confirm Order'} />
            <CheckoutSteps confirmOrder shipping />
            <div className="confirmOrder">
                <div className="">
                    <div>

                        <h4 className="mb-3">Shipping Info</h4>
                        <div className="pl-15">
                            <p><b>Name:</b> {user.name}</p>
                            <p><b>Phone:</b>{shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b>Address:</b> {shippingInfo.address},{shippingInfo.city},<br />{shippingInfo.state}-{shippingInfo.postalCode},{shippingInfo.country} </p>

                        </div>

                    </div>

                    <hr />
                    <div>
                        <h4 className="mt-4">Your Cart Items:</h4>
                        {cartItems.map((item, i) => (
                            <div key={i}>
                                <div className="mt-2 mb-2">
                                    <div className="confirmOrder__product">
                                        <div className="mr-4">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="mr-4">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>


                                        <div className=" mt-4 mr-4">
                                            <p>{item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b></p>
                                        </div>

                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>

                    <hr />
                </div>

                <div className="confirmOrder__summary p-10 mt-4">
                    <div >
                        <h4>Order Summary</h4>
                        <hr />
                        <div className="pl-10"> 
                            <p>Subtotal:  <span className="">${itemsPrice}</span></p>
                            <p>Shipping: <span className="">${shippingPrice}</span></p>
                            <p>Tax:  <span className="">${taxPrice}</span></p>

                            <hr />

                            <p>Total: <span className="">${totalPrice}</span></p>

                        </div>

                        <hr />
                        <Button variant="contained" onClick={processPayment} className="">Proceed to Payment</Button>
                    </div>
                </div>


            </div>
        </>
    )

}