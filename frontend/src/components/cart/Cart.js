import { DeleteForever, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from '../../slices/cartSlice'

export default function Cart() {

    const dispatch = useDispatch()
    const { items } = useSelector(state => state.cartState)
    const navigate = useNavigate()


    const increaseQty = (item) => {
        const count = item.quantity

        if (item.stock === 0 || count >= item.stock) return;
        dispatch(increaseCartItemQty(item.product))
    }

    const decreaseQty = (item) => {
        if (item.quantity === 1) return;
        dispatch(decreaseCartItemQty(item.product))
    }
    const checkoutHandler = () => {
        navigate('/shipping')



        //  navigate('/login?redirect=shipping') want to check why isn't work.




    }

    return (
        <div>
            {items.length === 0 ? <h2 className="mt-5">Your Cart: <b>0 items</b></h2> : <>
                <h2 className="mt-5">Your Cart: <b>{items.length}items</b></h2>

                <div className="cart">
                    <div className="cart__one">
                        {items.map((item, int) => (
                            <Fragment key={int}>
                                <hr />
                                <div className="cart__item">
                                    <div className="">
                                        <img src={item.image} alt={item.name}/>
                                    </div>

                                    <div className="cart__item--action pl-5">
                                        <div className='pt-10'>
                                            <Link to={`/product/${item.product}`} >{item.name.slice(0,14)}...</Link>
                                        </div>

                                        <div className=''>
                                            <div className='pt-10 pl-9'>${item.price}</div>

                                            <div className="">
                                                <div className="stockCounter">
                                                    <IconButton className="" onClick={() => decreaseQty(item)}><KeyboardDoubleArrowLeft /></IconButton>

                                                    <input type="number" className="count" value={item.quantity} readOnly />

                                                    <IconButton className="" onClick={() => increaseQty(item)
                                                    }><KeyboardDoubleArrowRight /></IconButton>
                                                </div>
                                            </div>


                                            <IconButton className='ml-3' onClick={() => dispatch(removeItemFromCart(item.product))}>
                                                <DeleteForever />
                                            </IconButton>

                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                        <hr />
                    </div>

                    <div className="cart__two">
                        <div>
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Subtotal:  <span className="">
                                {items.reduce((acc, item) => (acc + item.quantity), 0)} (Units)</span></p>
                            <p>Est. total: <span className="">${parseInt(items.reduce((acc, item) => (acc + item.quantity * item.price), 0))}</span></p>

                            <hr />
                            <Button variant='contained' className="" onClick={() => checkoutHandler()}>Check out</Button>
                        </div>
                    </div>
                </div>

            </>}

        </div>
    )
}