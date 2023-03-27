import { Link } from "react-router-dom";


export default function CheckoutSteps({ shipping, confirmOrder, payment }) {

    return (
        <div className="checkout mt-5">
            {shipping ?
                <Link to='/shipping'>
                    <div className="checkout__cur">Shipping Info</div>
                </Link> :
                <Link to='/shipping'>
                    <div className="checkout__not">Shipping Info</div>
                </Link>
            }
            {confirmOrder ?
                <Link to='/order/confirm'>
                    <div className="checkout__cur">Confirm Order</div>
                </Link> :
                <Link to='/order/confirm'>
                    <div className="checkout__not">Confirm Order</div>
                </Link>
            }
            {payment ?
                <Link to='/payment'>
                    <div className="checkout__cur">Payment</div>
                </Link> :
                <Link to='/payment'>
                    <div className="checkout__not">Payment</div>
                </Link>
            }
        </div>
    )
}