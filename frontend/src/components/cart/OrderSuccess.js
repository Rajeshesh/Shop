import { Link } from 'react-router-dom'

export default function OrderSuccess() {


    return (
        <div className="m-7">
            <div className="orderSuccess">
                <img className="" src="/images/success.png" alt="Order Success" width="200" height="200" />

                <h2>Your Order has been placed successfully.</h2>

                <Link to="/orders">Go to Orders</Link>
            </div>

        </div>
    )
}