import { MDBDataTable } from 'mdbreact'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userOrders as userOrdersAction } from '../../actions/orderAction'
import Metadata from '../layouts/MetaData'
import { Visibility } from '@mui/icons-material'
import { IconButton } from '@mui/material'

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
                action: <IconButton><Link to={`/order/${userOrder._id}`}><Visibility /></Link></IconButton>
            })
        })
        return data

    }



    return (
        <div className='myOrderList'>
            <Metadata title='My Orders' />
            <h1 className='mt-5 '>My Orders</h1>
            <MDBDataTable className='pl-6 pr-6 OTable' bordered striped hover data={setOrders()} />
        </div>
    )
}