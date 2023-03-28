import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';


export default function Product({ product }) {


    return (
        <div className={`product  m-1 mt-1 p-3`}>
            <div >
                <Link to={`/product/${product._id}`}  className='product__link' >
                    <img
                        className='product__image'
                        src={product.images[0].image}
                        alt={product.name}
                        width='100'
                        height='100'

                    />
                </Link>
                <div className="product__body ">
                    <h5 className="product__title">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h5>
                    <p className="product__text">${product.price}</p>
                    <div className=" ">
                        <Box
                            sx={{
                                width: 100,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Rating
                                name="text-feedback"
                                value={product.ratings}
                                readOnly
                                precision={0.5}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                        </Box>
                        <span id="noOfReviews">({product.numOfReviews} Reviews)</span>
                    </div>

                </div>
            </div>
        </div>
    )
}