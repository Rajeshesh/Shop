import { Link } from 'react-router-dom';

export default function Product({ product }) {
    return (
        <div className={`product  m-1 mt-1 p-3`}>
            <div >
                <Link to={`/product/${product._id}`} >
                    <img
                        className='product__image'
                        src={product.images[0].image}
                        alt={product.name}
                        width='100%'

                    />
                </Link>
                <div className="product__body ">
                    <h5 className="product__title">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h5>
                    <p className="product__text">${product.price}</p>
                    <div className="ratings ">
                        <div className="ratings__outer">
                            <div className="ratings__inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                        </div>
                        <span id="noOfReviews">({product.numOfReviews} Reviews)</span>
                    </div>

                </div>
            </div>
        </div>
    )
}