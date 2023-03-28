import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';



export default function ProductReview({ reviews }) {

    console.log(reviews)

    return (
        <div className="">
            <h3>Other's Reviews:</h3>
            <hr />
            {reviews && reviews.map((review, i) => (
                <div key={i} className="review mt-2 mb-2">
                    <Stack spacing={1}>
                        <Rating name="size-medium" defaultValue={review.rating} />
                    </Stack>
                    <p className="review_user">by {review.user.name || 'Not Available'}</p>
                    <p className="review_comment">{review.comment}</p>

                    <hr />
                </div>
            ))}
        </div>

    )
}