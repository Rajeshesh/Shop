

export default function ProductReview({ reviews }) {



    return (
        <div className="">
            <h3>Other's Reviews:</h3>
            <hr />
            {reviews && reviews.map((review, i) => (
                <div key={i} className="review mt-2 mb-2">
                    <div className="ratings__outer">
                        <div className="ratings__inner" style={{ width: `${review.rating / 5 * 100}%` }}></div>
                    </div>
                    <p className="review_user">by {review.user.name||'Not Available'}</p>
                    <p className="review_comment">{review.comment}</p>

                    <hr />
                </div>
            ))}
        </div>

    )
}