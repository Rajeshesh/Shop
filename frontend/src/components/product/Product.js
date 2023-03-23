import { Link } from 'react-router-dom';

export default function Product ({product, col}) {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} mt-1`}>
            <div className="card p-3 rounded">
                <img
                className="card__img mx-auto"
                src={product.images[0].image}
                alt={product.name}
                />
                <div className="card__body d-flex flex-column">
                <h5 className="card__title">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                </h5>
                <div className="ratings mt-auto">
                    <div className="ratings__outer">
                    <div className="ratings__inner" style={{width: `${product.ratings/ 5 * 100}%` }}></div>
                    </div>
                    <span id="noOfReviews">({product.numOfReviews} Reviews)</span>
                </div>
                <p className="card__text">${product.price}</p>
                <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>
    )
}