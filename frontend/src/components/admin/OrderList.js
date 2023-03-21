import { useDispatch, useSelector } from "react-redux"
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { Fragment, useEffect } from "react"
import { clearError, clearOrderDeleted } from "../../slices/orderSlice"
import Sidebar from "./Sidebar"
import Loader from '../layouts/Loader'
import { MDBDataTable } from 'mdbreact'
import { toast } from "react-toastify"
import { adminOrders as adminOrdersAction, deleteOrders } from "../../actions/orderAction"

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
                        <Link className="btn btn-primary" to={`/admin/order/${order._id}`}><i className="fa fa-pencil"></i></Link>
                        <Button onClick={(e) => deleteHandler(e, order._id)} className="btn btn-danger py-1 px-2 ml-2"><i className="fa fa-trash"></i></Button>
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
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Order List</h1>
                <>
                    {loading ? <Loader /> : <MDBDataTable data={setOrders()}
                        bordered
                        striped
                        hover
                        className="px-3" />}
                </>

            </div>
        </div>
    )
}