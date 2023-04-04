import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { memo } from 'react';



const ProductReview = ({ reviews }) => {

    return (
        <div className="">
            <h3>Other's Reviews:</h3>
            <hr />
            {reviews && reviews.map((review, i) => (
                <div key={i} className="review mt-2 mb-2">
                    <Stack spacing={1}>
                        <Rating name="size-medium" defaultValue={review.rating} readOnly />
                    </Stack>
                    <p className="review__user">by {review.user || 'Not Available'}</p>
                    <p className="review__comment">{review.comment}</p>

                    <hr />
                </div>
            ))}
        </div>
    )
}

export default memo(ProductReview)