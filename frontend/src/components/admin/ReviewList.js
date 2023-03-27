import { useDispatch, useSelector } from "react-redux"
import { Fragment, useEffect, useState } from "react"
import { clearError, clearReviewDeleted } from "../../slices/productSlice"
import Sidebar from "./Sidebar"
import Loader from '../layouts/Loader'
import { MDBDataTable } from 'mdbreact'
import { toast } from "react-toastify"
import { deleteReview, getReviews } from "../../actions/productActions"
import { Box, IconButton,Button } from "@mui/material"
import { DeleteOutline } from "@mui/icons-material"

export default function ReviewList() {
    const { reviews = [], loading = true, error, isReviewDeleted } = useSelector(state => state.productState)
    const [productId, setProductId] = useState('')
    const dispatch = useDispatch()
    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'Action',
                    field: 'action',
                    sort: 'asc'
                }
            ],
            rows: []
        }
        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                user: review.user.name,
                comment: review.comment,
                action: (
                    <Fragment>
                        <IconButton color="secondary" aria-label="delete" onClick={(e) => deleteHandler(e, review._id)}className="pl-6"><DeleteOutline /></IconButton>
                    </Fragment>)
            })
        })
        return data
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true
        dispatch(deleteReview(productId, id))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(getReviews(productId))

    }
    useEffect(() => {
        if (error) {
            toast(error, {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearError())
            })
        }

        if (isReviewDeleted) {
            toast('Review Deleted Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearReviewDeleted())

            });
            dispatch(getReviews(productId))

            return;
        }
    }, [error, dispatch, isReviewDeleted])


    return (
        <div className="">
            <Box className=''>

                <Sidebar />
            </Box>
            <div className="reviewList">
                <h1 className="mt-4 mb-4">Review List</h1>
                <div className=" mt-5">
                    <div className="">
                        <form onSubmit={submitHandler} >
                            <div className=''>
                                <label>Product ID</label>
                                <input type='text'
                                    onChange={e => setProductId(e.target.value)}
                                    value={productId}
                                    className='reviewList__input mb-2' />

                            </div>
                            <Button variant="contained" type="submit" disabled={loading} className='btn btn-primary btn-block py-2'>
                                Search
                            </Button>

                        </form>
                    </div>
                </div>
                <>
                    {loading ? <Loader /> : <MDBDataTable data={setReviews()}
                        bordered
                        striped
                        hover
                        className="px-3 OTable" />}
                </>

            </div>
        </div>
    )
}