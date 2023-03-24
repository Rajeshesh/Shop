import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import Loader from ".././layouts/Loader";
import MetaData from ".././layouts/MetaData";
import Product from ".././product/Product";
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import { useParams } from "react-router-dom";
import RangeSlider from "./Slider";
import { Box } from "@mui/material";
import { Stack } from "@mui/system";

export default function ProductSearch() {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState)
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 1000]);
    const [priceChanged, setPriceChanged] = useState(price);
    const [category, setCategory] = useState(null);
    const [rating, setRating] = useState(0);
    const [filter, setFilter] = useState(false);

    const { keyword } = useParams();
    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ];

    const setCurrentPageNo = (pageNo) => {

        setCurrentPage(pageNo)

    }


    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        dispatch(getProducts(keyword, priceChanged, category, rating, currentPage))
    }, [error, dispatch, currentPage, keyword, priceChanged, category, rating])
    // priceChanged instead of price


    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'Buy Best Products'} />
                    <Stack direction="row"
                        justifyContent="space-between"
                        alignItems="center">
                        <Box className="m-5">Search Products</Box>
                        <Box className="m-5" sx={{ display: { xs: 'block', sm: 'none' },border:'none' }} onClick={e => setFilter(v => v ? false : true)}component='button' >Filter</Box>
                    </Stack>
                    <section id="products" >
                        <Stack direction="row" >
                            <Box sx={{ display: { xs: filter ? 'block' : 'none', sm: 'block' } }} className="col3  mt-1 ">
                                <div className="pr-6" onMouseUp={() => setPriceChanged(price)}>
                                    <RangeSlider price={price} setPrice={setPrice} />
                                </div>
                                <hr className="mt-2" />
                                <div className="mt-5">
                                    <h4 className="mb-3">Categories</h4>
                                    <ul className="pl-0">
                                        {categories.map(category =>
                                            <li
                                                style={{
                                                    cursor: "pointer",
                                                    listStyleType: "none"
                                                }}
                                                key={category}
                                                onClick={() => {
                                                    setCategory(category)
                                                }}
                                            >
                                                {category}
                                            </li>

                                        )}

                                    </ul>
                                </div>
                                <hr className="mt-2" />
                                {/* Ratings Filter */}
                                <div className="mt-2">
                                    <h4 className="mb-3">Ratings</h4>
                                    <ul className="pl-0">
                                        {[5, 4, 3, 2, 1].map(star =>
                                            <li
                                                style={{
                                                    cursor: "pointer",
                                                    listStyleType: "none"
                                                }}
                                                key={star}
                                                onClick={() => {
                                                    setRating(star)
                                                }}
                                            >
                                                <div className="ratings__outer">
                                                    <div
                                                        className="ratings__inner"
                                                        style={{
                                                            width: `${star * 20}%`
                                                        }}
                                                    >

                                                    </div>
                                                </div>
                                            </li>

                                        )}

                                    </ul>
                                </div>
                            </Box>
                            <div >
                                <div className="products">
                                    {products && products.map(product => (
                                        <Product  key={product._id} product={product} />
                                    ))}
                                </div>
                            </div>
                        </Stack>
                    </section>
                    {productsCount > 0 && productsCount > resPerPage ?
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                onChange={setCurrentPageNo}
                                totalItemsCount={productsCount}
                                itemsCountPerPage={resPerPage}
                                nextPageText={'Next'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass={'page-item'}
                                linkClass={'page-link'}
                            />
                        </div> : null}
                </Fragment>
            }
        </Fragment>
    )
}