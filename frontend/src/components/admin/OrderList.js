import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Fragment, useEffect } from "react"
import { clearError, clearOrderDeleted } from "../../slices/orderSlice"
import Sidebar from "./Sidebar"
import Loader from '../layouts/Loader'
import { MDBDataTable } from 'mdbreact'
import { toast } from "react-toastify"
import { adminOrders as adminOrdersAction, deleteOrders } from "../../actions/orderAction"
import { Box, IconButton } from "@mui/material"
import { DeleteOutline, Edit } from "@mui/icons-material"


export default function OrderList() {
    const { adminOrders = [], loading = true, error, isOrderDeleted } = useSelector(state => state.orderState)
    const dispatch = useDispatch()
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number Of Items',
                    field: 'noOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }
        adminOrders.forEach(order => {
            data.rows.push({
                id: order._id,
                noOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: <p style={{ color: order.orderStatus.includes('Processing') ? 'red' : 'green' }}>{order.orderStatus}</p>,
                actions: (
                    <Fragment>
                        <IconButton color="primary">
                            <Link className="" to={`/admin/order/${order._id}`}><Edit /></Link>
                        </IconButton>
                        <IconButton color="secondary" aria-label="delete" onClick={(e) => deleteHandler(e, order._id)} className=""><DeleteOutline /></IconButton>
                    </Fragment>)
            })
        })
        return data
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true
        dispatch(deleteOrders(id))
    }



    useEffect(() => {
        if (error) {
            toast(error, {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearError())
            })
        }

        if (isOrderDeleted) {
            toast('Order Deleted Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearOrderDeleted())

            }
            );

            return;
        }
        dispatch(adminOrdersAction)
    }, [error, dispatch, isOrderDeleted])


    return (
        <div className="">
            <Box className=''>

                <Sidebar />
            </Box>
            <div className="orderList">
                <h1 className="mt-4 mb-4">Order List</h1>
                <div>
                    {loading ? <Loader /> : <MDBDataTable data={setOrders()}
                        bordered
                        striped
                        hover
                        className="pl-6 pr-6 OTable" />}
                </div>

            </div>
        </div>
    )
}