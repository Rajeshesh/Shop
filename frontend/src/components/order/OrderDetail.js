import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom";
import { orderDetail as orderDetailAction } from '../../actions/orderAction'
import Loader from "../layouts/Loader";
import { Box } from '@mui/material'

export default function OrderDetail() {

    const { orderDetail, loading } = useSelector(state => state.orderState)
    const { shippingInfo = {}, user = {}, orderStatus = "Processing", orderItems = [], totalPrice = 0, paymentInfo = {} } = orderDetail

    const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(orderDetailAction(id))


    }, [id])


    return (
        <>
            {loading ? <Loader /> : <>
                <div className="">
                    <div className="orderDetail">

                        <h4 className="mb-4 mt-4">Shipping Info</h4>
                        <div className="pl-15">
                            <p><b>Name:</b> {user.name}</p>
                            <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b>Address:</b>{shippingInfo.address}, {shippingInfo.city} , {shippingInfo.state}, {shippingInfo.postalCode},{shippingInfo.country}</p>
                            <p><b>Amount:</b> ${totalPrice}</p>
                        </div>

                        <hr />

                        <h4 className="mt-4 mb-2">Payment</h4>
                        <p className={isPaid ? 'greenColor' : 'redColor'}><b>{isPaid ? 'PAID' : 'NOT PAID'}</b></p>


                        <h4 className="mt-4 mb-2">Order Status</h4>
                        <p className={orderStatus && orderStatus.includes('Delivered') ? 'greenColor' : 'redColor'}><b>{orderStatus}</b></p>


                        <hr />
                        <h4 className="mt-4 mb-4">Order Items</h4>

                        <div className=" mt-1 mb-1">
                            {orderItems && orderItems.map((item, i) => (
                                <div className="orderItem mt-5 mb-5" key={i}>
                                    <div className="">
                                        <img src={item.image} alt="Laptop" height="45" width="65" />
                                    </div>

                                    <Box sx={{ display: { xs: 'none', sm: 'block' } }} className="">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Box>
                                    <Box sx={{ display: { xs: 'block', sm: 'none' } }} className="">
                                        <Link to={`/product/${item.product}`}>{item.name.slice(0, 6)}...</Link>
                                    </Box>


                                    <div className="mt-4">
                                        <p>${item.price}</p>
                                    </div>

                                    <div className="mt-4">
                                        <p>{item.quantity} Piece(s)</p>
                                    </div>
                                </div>

                            ))}

                        </div>
                        <hr />
                    </div>
                </div>
            </>
            }
        </>
    )
}