import { MDBDataTable } from 'mdbreact'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userOrders as userOrdersAction } from '../../actions/orderAction'
import Metadata from '../layouts/MetaData'


export default function UserOrder() {

    const dispatch = useDispatch()
    const { userOrders = [] } = useSelector(state => state.orderState)

    useEffect(() => {

        dispatch(userOrdersAction)
    }, [])


    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "Order ID",
                    field: 'id',
                    sort: "asc"
                },
                {
                    label: "Number of Items",
                    field: 'numOfItems',
                    sort: "asc"
                }, {
                    label: "Amount",
                    field: 'amount',
                    sort: "asc"
                },
                {
                    label: "Status",
                    field: 'status',
                    sort: "asc"
                },
                {
                    label: "Action",
                    field: 'action',
                    sort: "asc"
                }
            ],
            rows: []
        }
        userOrders.forEach(userOrder => {
            data.rows.push({
                id: userOrder._id,
                numOfItems: userOrder.orderItems.length,
                amount: `$${userOrder.totalPrice}`,
                status: userOrder.orderStatus && userOrder.orderStatus.includes('Delivered') ? (<p style={{ color: 'green' }} >{userOrder.orderStatus}</p >) : (<p style={{ color: 'red' }} >{userOrder.orderStatus}</p >),
                action: <Link to={`/order/${userOrder._id}`} className='btn btn-primary'><i className='fa fa-eye'></i></Link>
            })
        })
        return data

    }



    return (
        <>
            <Metadata title='My Orders' />
            <h1 className='mt-5'>My Orders</h1>
            <MDBDataTable className='px-3' bordered striped hover data={setOrders()} />



        </>
    )
}