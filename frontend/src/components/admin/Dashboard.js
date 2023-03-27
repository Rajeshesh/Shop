import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { getAdminProduct } from "../../actions/productActions";
import { getUsers } from '../../actions/userActions'
import { adminOrders as adminOrdersAction } from '../../actions/orderAction'
import { Box } from '@mui/material'
import { ChevronRight } from '@mui/icons-material'

export default function Dashboard() {
    const { products = [] } = useSelector(state => state.productsState)
    const { adminOrders = [] } = useSelector(state => state.orderState)
    const { users = [] } = useSelector(state => state.userState)
    const dispatch = useDispatch()
    const outOfStockCount = () => {

        let outOfStock = 0

        if (products.length > 0) {
            products.forEach(product => {
                if (product.stock === 0) {
                    outOfStock += 1
                }

            });
        }
        return outOfStock
    }
    const totalPriceC = () => {

        let totalPrice = 0
        if (adminOrders.length > 0) {
            adminOrders.forEach(order => {
                totalPrice += order.totalPrice
            })
        }
        return totalPrice
    }
    useEffect(() => {
        dispatch(getAdminProduct)
        dispatch(getUsers)
        dispatch(adminOrdersAction)
    }, [])


    return (

        <div className="">
            <Box className=''>

                <Sidebar />
            </Box>
            <div className="">
                <div className="dsbd">
                    <h1 className="mt-4 mb-4">Dashboard</h1>
                    <div className="dsbd__ttl m-3">
                        <div className="">Total Amount
                        </div>
                        <div>
                            <b>${totalPriceC()}</b>
                        </div>
                    </div>

                    <div className="dsbd__i p-8">
                        <div className="">
                            <div className="">
                                <div className="">
                                    <div className="">Products</div>
                                </div>
                                <div className="">
                                    <b>{products.length}</b>
                                </div>

                                <Link className="" to="/admin/products">
                                    <span className="">View Details</span>
                                    <span className="">
                                        <ChevronRight />
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div className=" ">
                            <div className="">
                                <div className="">
                                    <div className="">Orders</div>
                                </div>
                                <div className="">
                                    <b>{adminOrders.length}</b>
                                </div>
                                <Link className="" to="/admin/order">
                                    <span className="">View Details</span>
                                    <span className="">
                                        <ChevronRight />
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div className="">
                            <div className="">
                                <div className="">
                                    <div className="">Users</div>
                                </div>
                                <div className="">
                                    <b>{users.length}</b>
                                </div>
                                <Link className="" to="/admin/users">
                                    <span className="">View Details</span>
                                    <span className="">
                                        <ChevronRight />
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div className=" ">
                            <div className="">
                                <div className="">
                                    <div className="">Out of Stock </div>

                                </div>
                                <div>
                                    <b>{outOfStockCount()}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}