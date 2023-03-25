import { Box } from '@mui/material'
import { Link } from 'react-router-dom'


export default function Sidebar() {

    return (

        <div className="admin__nav">
            <Box className='p-0 pt-5 pb-5'>
                <div>
                    <Link to="/admin/dashboard">Dashboard</Link>
                </div>
                <div>
                    <Link to="/admin/products">Products</Link>
                </div>

                <div>
                    <Link to="/admin/products/create">Create Product</Link>
                </div>

                <div>
                    <Link to="/admin/order"> Orders</Link>
                </div>

                <div>
                    <Link to="/admin/users">Users</Link>
                </div>

                <div>
                    <Link to="/admin/reviews">Reviews</Link>
                </div>
            </Box>
        </div>
    )
}