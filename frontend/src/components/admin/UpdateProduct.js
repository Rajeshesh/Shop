import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProduct, updateProduct } from "../../actions/productActions";
import { clearError, clearProductUpdated } from "../../slices/productSlice";
import Sidebar from "./Sidebar";


export default function UpdateProduct() {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState(0)
    const [seller, setSeller] = useState('')
    const [images, setImages] = useState([])
    const [imagesCleared, setImagesCleared] = useState(false)
    const [imagesPreview, setImagesPreview] = useState([])

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id: productId } = useParams()

    const { loading, isProductUpdated, product = {}, error } = useSelector(state => state.productState)

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
        'Home']
    const onImagesChange = (e) => {
        const files = Array.from(e.target.files)

        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState == 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages((oldArray) => [...oldArray, file])
                }
            }
            reader.readAsDataURL(file)



        })
    }

    const sumbitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('stock', stock)
        formData.append('description', description)
        formData.append('seller', seller)
        formData.append('category', category)
        formData.append('imagesCleared', imagesCleared)
        images.forEach((image) => {
            formData.append('images', image)

        })

        dispatch(updateProduct(productId, formData))
    }

    const clearImagesHandler = () => {
        setImages([])
        setImagesPreview([])
        setImagesCleared(true)



    }


    useEffect(() => {
        if (isProductUpdated) {
            toast('Product Updated Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductUpdated())

            }
            );
            setImages([])
            navigate('/admin/products')

            return;
        }

        if (error) {
            toast(error, {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearError())
            });
            return;
        }
        dispatch(getProduct(productId))
    }, [isProductUpdated, error, dispatch])

    useEffect(() => {
        if (product._id) {
            setName(product.name)
            setPrice(product.price)
            setStock(product.stock)
            setDescription(product.description)
            setSeller(product.seller)
            setCategory(product.category)

            let images = []
            product.images.forEach(image => {
                images.push(image.image)
            })

            setImagesPreview(images)

        }
    }, [product])

    return (


        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <>
                    <div className="wrapper my-5">
                        <form onSubmit={sumbitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4">Update Product</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input type="text" id="name_field" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Price</label>
                                <input type="text" id="price_field" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea className="form-control" id="description_field"
                                    value={description} onChange={(e) => setDescription(e.target.value)} rows="8"></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select className="form-control" id="category_field" onChange={(e) => setCategory(e.target.value)} value={category}>
                                    <option value=''>Select</option>

                                    {categories.map((item, i) => (
                                        <option key={i} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input type="number" id="stock_field" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="seller_field">Seller Name</label>
                                <input type="text" id="seller_field" className="form-control" value={seller} onChange={(e) => setSeller(e.target.value)} />
                            </div>

                            <div className='form-group'>
                                <label>Images</label>

                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='product_images'
                                        className='custom-file-input'
                                        id='customFile'
                                        multiple
                                        onChange={onImagesChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Images
                                    </label>
                                </div>
                                {imagesPreview.length > 0 && <span onClick={clearImagesHandler} className="mr-2 " style={{ cursor: 'pointer' }}><i className="fa fa-trash"></i></span>}
                                {imagesPreview.map((image, i) => (
                                    <img src={image}
                                        width='55'
                                        height='52'
                                        alt="Image Priview"
                                        className="mt-3 mr-2"
                                        key={i} />
                                ))}
                            </div>


                            <button id="login_button"
                                disabled={loading}
                                type="submit" className="btn btn-block py-3">
                                UPDATE
                            </button>

                        </form>
                    </div>
                </>

            </div>
        </div>
    )
}