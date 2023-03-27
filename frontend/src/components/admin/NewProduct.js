import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createNewProduct } from "../../actions/productActions";
import { clearError, clearProductCreated } from "../../slices/productSlice";
import Sidebar from "./Sidebar";


export default function NewProduct() {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState(0)
    const [seller, setSeller] = useState('')
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { loading, isProductCreated, error } = useSelector(state => state.productState)

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
        images.forEach((image) => {
            formData.append('images', image)

        })

        dispatch(createNewProduct(formData))
    }
    useEffect(() => {
        if (isProductCreated) {
            toast('Product Created Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductCreated())

            }
            );
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
    }, [isProductCreated, error, dispatch])


    return (


        <div className="">
            <Box className=''>

                <Sidebar />
            </Box>
            <div className="col-12 col-md-10">
                <>
                    <div className="input">
                        <form onSubmit={sumbitHandler} className="input__form mt-5" encType='multipart/form-data'>
                            <h1 className="mb-4">New Product</h1>

                            <div className="">
                                <label htmlFor="name_field">Name</label>
                                <input type="text" id="name_field" className="" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="">
                                <label htmlFor="price_field">Price</label>
                                <input type="text" id="price_field" className="" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>

                            <div className="">
                                <label htmlFor="description_field">Description</label>
                                <textarea className="" id="description_field"
                                    value={description} onChange={(e) => setDescription(e.target.value)} rows="8"></textarea>
                            </div>

                            <div className="">
                                <label htmlFor="category_field">Category</label>
                                <select className="" id="category_field" onChange={(e) => setCategory(e.target.value)}>
                                    <option value=''>Select</option>

                                    {categories.map((item, i) => (
                                        <option key={i} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="stock_field">Stock</label>
                                <input type="number" id="stock_field" className="" value={stock} onChange={(e) => setStock(e.target.value)} />
                            </div>

                            <div className="">
                                <label htmlFor="seller_field">Seller Name</label>
                                <input type="text" id="seller_field" className="" value={seller} onChange={(e) => setSeller(e.target.value)} />
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
                                {imagesPreview.map((image, i) => (
                                    <img src={image}
                                        width='55'
                                        height='52'
                                        alt="Image Priview"
                                        className="mt-3 mr-2"
                                        key={i} />
                                ))}
                            </div>


                            <Button 
                            variant="contained"
                            id="login_button"
                                disabled={loading}
                                type="submit" className="pt-5">
                                CREATE
                            </Button>

                        </form>
                    </div>
                </>

            </div>
        </div>
    )
}