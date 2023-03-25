import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productActions"
import { clearReviewSubmitted, clearError, clearProduct } from "../../slices/productSlice"
import Loader from '../layouts/Loader';
import { Carousel,Modal } from 'react-bootstrap';
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";

import { Button, IconButton } from '@mui/material'
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material'


export default function ProductDetail() {
    const { loading, product = {}, isReviewSubmitted = false, error } = useSelector((state) => state.productState);
    const { user } = useSelector((state) => state.authState);
    const dispatch = useDispatch();
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const increaseQty = () => {
        const count = document.querySelector(".count")

        if (product.stock === 0 || count.valueAsNumber >= product.stock) return
        const qty = count.valueAsNumber + 1
        setQuantity(qty)
    }
    const decreaseQty = () => {
        const count = document.querySelector(".count")

        if (count.valueAsNumber === 1) return
        const qty = count.valueAsNumber - 1
        setQuantity(qty)
    }

    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')

    const reviewHandlar = () => {
        const formData = new FormData()
        formData.append("rating", rating)
        formData.append("comment", comment)
        formData.append("productId", id)
        console.log(formData)
        dispatch(createReview(formData))
    }
    useEffect(() => {
        if (isReviewSubmitted) {
            handleClose()
            toast('Review Submitted Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearReviewSubmitted())

            })
        }
        if (error) {
            toast(error, {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearError())
            }
            );
            return;
        }

        if (!product._id || isReviewSubmitted) {
            dispatch(getProduct(id))
        }

        return () => {
            dispatch(clearProduct())
        }


    }, [dispatch, id, isReviewSubmitted, error])


    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="productDetail">
                        <div className="" id="">
                            <Carousel pause="hover">
                                {product.images && product.images.map(image =>
                                    <Carousel.Item key={image._id}>
                                        <img className="carousel__imag" src={image.image} alt={product.name} height="350" width="350" />
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        </div>

                        <div className=" mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Product # {product._id}</p>

                            <hr />

                            <div className="ratings__outer">
                                <div className="ratings__inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                            </div>
                            <span id="noOfReviews">({product.numOfReviews} Reviews)</span>

                            <hr />

                            <p id="product_price">${product.price}</p>
                            <div className="stockCounter d-inline">
                                <IconButton className="" onClick={decreaseQty}><KeyboardDoubleArrowLeft /></IconButton>

                                <input type="number" className="count" value={quantity} readOnly />

                                <IconButton className="" onClick={increaseQty}><KeyboardDoubleArrowRight /></IconButton>
                            </div>
                            <Button type="button" variant="contained" disabled={product.stock === 0 ? true : false} className="ml-4"
                                onClick={() => {
                                    dispatch(addCartItem(product._id, quantity))
                                    toast('Cart Item Added!', {
                                        type: 'success',
                                        position: toast.POSITION.BOTTOM_CENTER,
                                    })
                                }}>Add to Cart</Button>

                            <hr />

                            <p>Status: <span className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-1">Sold by: <strong>{product.seller}</strong></p>

                            {user ?
                                <Button type="button" variant="contained" className="mt-4 mb-4" data-toggle="modal" data-target="#ratingModal" onClick={handleShow}>
                                    Submit Your Review
                                </Button> :
                                <Button variant="outlined" className="mt-5">Login to post Review</Button>
                            }

                           

                        </div>

                    </div>
                    {
                        product.reviews && product.reviews.length > 0 ? <ProductReview reviews={product.reviews} /> : null
                    }
                     <div className="row mt-2 mb-5">
                                <div className="rating w-50">
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Submit Review</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <ul className="stars" >
                                                {
                                                    [1, 2, 3, 4, 5].map((star, i) => (
                                                        <li key={i}
                                                            value={star}
                                                            onClick={() => setRating(star)}
                                                            className={`star ${star <= rating ? 'orange' : ''}`}
                                                            onMouseOver={e => e.target.classList.add('yellow')}
                                                            onMouseOut={e => e.target.classList.remove('yellow')}
                                                        ><i className="fa fa-star"></i></li>
                                                    ))
                                                }
                                            </ul>

                                            <textarea name="review"
                                                onChange={(e) => setComment(e.target.value)} id="review" className="form-control mt-3"></textarea>
                                            <button disabled={loading} onClick={reviewHandlar} className="btn my-3 float-rigth review-btn px-4 text-white" aria-label="Close">Submit</button>
                                        </Modal.Body>
                                    </Modal>

                                </div>
                            </div>
                </Fragment>}
        </Fragment >
    )
}