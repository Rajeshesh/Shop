import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateOrder, orderDetail as orderDetailAction } from "../../actions/orderAction";
import { clearOrderUpdated, clearError } from "../../slices/orderSlice";
import Sidebar from "./Sidebar";


export default function UpdateOrder() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id: orderId } = useParams()
    const { loading = true, isOrderUpdated = false, orderDetail = {}, error } = useSelector(state => state.orderState)

    const { user = {}, orderItems = [], shippingInfo = {}, totalPrice = 0, paymentInfo = {} } = orderDetail
    const isPaid = paymentInfo.status === 'succeeded' ? true : false
    const [orderStatus, setOrderStatus] = useState('Processing')

    const sumbitHandler = (e) => {
        e.preventDefault()
        const orderData = {}
        orderData.orderStatus = orderStatus
        dispatch(updateOrder(orderId, orderData))
    }

    useEffect(() => {
        if (isOrderUpdated) {
            toast('Order Updated Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearOrderUpdated())

            }
            );
            // navigate('/admin/order')

            return;
        }

        if (error) {
            toast(error, {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearError())
            });
            return;
        }
        dispatch(orderDetailAction(orderId))
    }, [isOrderUpdated, error, navigate, dispatch, orderId])

    useEffect(() => {
        if (orderDetail._id) {
            setOrderStatus(orderDetail.orderStatus)

        }
    }, [orderDetail])

    return (
        <div className="">
            <Box className=''>

                <Sidebar />
            </Box>
            <div className="orderDetail">
                <div className="">
                    <div>
                        <div className="mt-5 mb-8">
                            <h2 className="">Order # </h2>
                            <b>{orderDetail._id}</b>

                        </div>
                        <h4 className="mb-4">Shipping Info</h4>
                        <div className="pl-10">
                            <p><b>Name:</b> {user.name}</p>
                            <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b>Address:</b>{shippingInfo.address}, {shippingInfo.city} , {shippingInfo.state}, {shippingInfo.postalCode},{shippingInfo.country}</p>
                            <p><b>Amount:</b> ${totalPrice}</p>
                        </div>
                        <hr />

                    </div>

                    <div className="">

                        <h4 className="my-4">Payment</h4>
                        <p className={`${isPaid ? 'greenColor' : 'redColor'} pl-15`}><b>{isPaid ? 'PAID' : 'NOT PAID'}</b></p>


                        <h4 className="my-4">Order Status</h4>
                        <p className={`${orderStatus && orderStatus.includes('Delivered') ? 'greenColor' : 'redColor'} pl-15`}><b>{orderStatus}</b></p>
                        <hr />
                    </div>
                    <div>
                        <h4 className="my-4">Order Items</h4>
                        <div className="cart__item my-1">
                            {orderItems && orderItems.map((item, i) => (
                                <div className="orderItem" key={i}>
                                    <div className="">
                                        <img src={item.image} alt="Laptop" height="45" width="65" />
                                    </div>
                                    <div>
                                        <div>
                                            <div className="pl-10">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="pl-10">
                                                <b>${item.price}</b>
                                            </div>
                                            <div className="pl-15">
                                                <b>{item.quantity} Piece(s)</b>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr />
                </div>
                <div className="updateOrder">
                    <h4 className="my-4">Order Status</h4>
                    <div className="">
                        <select className="" onChange={e => setOrderStatus(e.target.value)} value={orderStatus} name='status'>
                            <option value='Processing'>Processing</option>
                            <option value='Delivered'>Delivered</option>
                            <option value='Shipped'>Shipped</option>
                        </select>

                    </div>
                    <div className='updateOrder__btn '>
                        <Button variant="contained"
                            disabled={loading}
                            onClick={sumbitHandler} className="mt-4">Update Status
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}