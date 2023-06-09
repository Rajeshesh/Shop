import { Fragment, useEffect, useState, memo, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productActions"
import { clearReviewSubmitted, clearError, clearProduct } from "../../slices/productSlice"
import Loader from '../layouts/Loader';
import { Carousel, Modal } from 'react-bootstrap';
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";
import StarIcon from '@mui/icons-material/Star';
import { Box, Button, IconButton, Rating } from '@mui/material'
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, Star } from '@mui/icons-material'


const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

export const CarouselReUse = memo(({ product, h, w }) =>
    <Carousel pause="hover">
        {product.images && product.images.map(image =>
            <Carousel.Item key={image._id}>
                <img className="carousel__imag" src={image.image} alt={product.name} height={h} width={w} />
            </Carousel.Item>
        )}
    </Carousel>)

const BasicDetails = memo(({ product }) =>
    <>
        <h3>{product.name}</h3>
        <Box sx={{ width: 100, display: 'flex', alignItems: 'center', }} >
            <Rating
                name="text-feedback"
                value={product.ratings}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Box sx={{ ml: 2 }}>{labels[product.ratings]}</Box>
        </Box>

        <span id="noOfReviews">({product.numOfReviews} Reviews)</span>
        <p id="product_price">${product.price}</p>
        <p>Status: <span className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
        <h4 className="mt-2">Description:</h4>
        <p>{product.description}</p>
        <hr />
        <p id="product_seller mb-1">Sold by: <strong>{product.seller}</strong></p>
    </>)

const AddToCart = memo(({ decreaseQty, quantity, increaseQty, product, clickCallBack }) => <>

    <div className="stockCounter ">
        <IconButton className="" onClick={decreaseQty}><KeyboardDoubleArrowLeft /></IconButton>
        <input type="number" className="count" value={quantity} readOnly />
        <IconButton className="" onClick={increaseQty}><KeyboardDoubleArrowRight /></IconButton>
    </div>
    <Button type="button" variant="contained" disabled={product.stock === 0 ? true : false} className="ml-4"
        onClick={clickCallBack}>Add to Cart
    </Button>
</>)

const ModalReUse = memo(({ show, handleClose, setRatingUCF, rating, reviewHandlar, loading, setCommentUCF }) =>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Submit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Rating name="half-rating" defaultValue={3} precision={1}
                onClick={(e) => setRatingUCF(e.target.value)} />
            <textarea name="review"
                onChange={(e) => setCommentUCF(e.target.value)} id="review" className="mt-3"></textarea>
            <Button disabled={loading} onClick={reviewHandlar} className="mt-3" variant="contained" aria-label="Close">Submit</Button>
        </Modal.Body>
    </Modal>)



export default function ProductDetail() {
    const { loading, product = {}, isReviewSubmitted = false, error } = useSelector((state) => state.productState);
    const { user } = useSelector((state) => state.authState);
    const dispatch = useDispatch();
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)

    const [show, setShow] = useState(false);
    const [rating, setRating] = useState(3)
    const [comment, setComment] = useState('')

    const handleClose = useCallback(() => setShow(false), [show]);
    const handleShow = useCallback(() => setShow(true), [show]);
    const setRatingUCF = useCallback((n) => setRating(n), [rating]);
    const setCommentUCF = useCallback((v) => setComment(v), [comment]);

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

    const reviewHandlar = useCallback(() => {
        const formData = new FormData()
        formData.append("rating", rating)
        formData.append("comment", comment)
        formData.append("productId", id)
        formData.append("user", user.name)
        formData.append("email", user.email)
        dispatch(createReview(formData))
    }, [rating, comment])   //can use like click variable, if the form big

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
            });
            return;
        }
        if (!product._id || isReviewSubmitted) {
            dispatch(getProduct(id))
        }

        return () => {
            dispatch(clearProduct())
        }
    }, [id, isReviewSubmitted, error])

    const modelObj = {
        show,
        handleClose,
        setRatingUCF,
        rating,
        reviewHandlar,
        loading,
        setCommentUCF
    }

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="productDetail">
                        <div className="" id="">
                            <CarouselReUse product={product} h={`350`} w={`350`} />
                        </div>
                        <div className=" mt-5">
                            <BasicDetails product={product} />
                            <hr />
                            <AddToCart decreaseQty={decreaseQty} increaseQty={increaseQty} quantity={quantity} product={product} clickCallBack={() => {
                                dispatch(addCartItem(product._id, quantity))
                                toast('Cart Item Added!', {
                                    type: 'success',
                                    position: toast.POSITION.BOTTOM_CENTER,
                                })
                            }} />
                        </div>
                    </div>
                    {user ?
                        <Button type="button" variant="contained" className="mt-4 mb-4" data-toggle="modal" data-target="#ratingModal" onClick={handleShow}>
                            Submit Your Review
                        </Button> :
                        <Button variant="outlined" className="mt-5"><Link to='/login'>Login to post Review</Link></Button>
                    }
                    {
                        product.reviews && product.reviews.length > 0 ? <ProductReview reviews={product.reviews} /> : null
                    }
                    <div className=" mt-2 mb-5">
                        <div className="rating ">
                            <ModalReUse {...modelObj} />
                        </div>
                    </div>
                </Fragment>}
        </Fragment >
    )
}