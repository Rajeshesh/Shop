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


        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <>
                    <div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-5">Order # {orderDetail._id}</h1>

                            <h4 className="mb-4">Shipping Info</h4>
                            <p><b>Name:</b> {user.name}</p>
                            <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                            <p className="mb-4"><b>Address:</b>{shippingInfo.address}, {shippingInfo.city} , {shippingInfo.state}, {shippingInfo.postalCode},{shippingInfo.country}</p>
                            <p><b>Amount:</b> ${totalPrice}</p>

                            <hr />

                            <h4 className="my-4">Payment</h4>
                            <p className={isPaid ? 'greenColor' : 'redColor'}><b>{isPaid ? 'PAID' : 'NOT PAID'}</b></p>


                            <h4 className="my-4">Order Status:</h4>
                            <p className={orderStatus && orderStatus.includes('Delivered') ? 'greenColor' : 'redColor'}><b>{orderStatus}</b></p>


                            <h4 className="my-4">Order Items:</h4>

                            <hr />
                            <div className="cart__item my-1">
                                {orderItems && orderItems.map((item, i) => (
                                    <div className="row my-5" key={i}>
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt="Laptop" height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>${item.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.quantity} Piece(s)</p>
                                        </div>
                                    </div>

                                ))}

                            </div>
                            <hr />
                        </div>
                        <div className="col-12 col-lg-3 mt-5">
                            <h4 className="my-4">Order Status</h4>
                            <div className="from-group">
                                <select className="form-control" onChange={e => setOrderStatus(e.target.value)} value={orderStatus} name='status'>
                                    <option value='Processing'>Processing</option>
                                    <option value='Delivered'>Delivered</option>
                                    <option value='Shipped'>Shipped</option>
                                </select>

                            </div>
                            <button
                                disabled={loading}
                                onClick={sumbitHandler} className="btn btn-primary btn-block">Update Status
                            </button>
                        </div>
                    </div>
                </>

            </div>
        </div>
    )
}