import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Fragment, useEffect } from "react"
import { clearError } from "../../slices/productsSlice"
import { deleteProduct, getAdminProduct } from "../../actions/productActions"
import Sidebar from "./Sidebar"
import Loader from '../layouts/Loader'
import { MDBDataTable } from 'mdbreact'
import { toast } from "react-toastify"
import { clearProductDeleted } from "../../slices/productSlice"
import { Box, IconButton } from "@mui/material"
import { DeleteOutline, Edit } from "@mui/icons-material"

export default function ProductsList() {
    const { products = [], loading = true, error } = useSelector(state => state.productsState)
    const { isProductDeleted = false, error: prodectError } = useSelector(state => state.productState)
    const dispatch = useDispatch()
    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }
        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: (
                    <Fragment>
                        <IconButton color="primary">
                            <Link className="" to={`/admin/product/${product._id}`}><Edit /></Link>
                        </IconButton>
                        <IconButton color="secondary" aria-label="delete" onClick={(e) => deleteHandler(e, product._id)} className=""><DeleteOutline /></IconButton>
                    </Fragment>)
            })
        })

        return data
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true
        dispatch(deleteProduct(id))
    }



    useEffect(() => {
        if (error || prodectError) {
            toast(error || prodectError, {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearError())
            })
        }

        if (isProductDeleted) {
            toast('Prodect Deleted Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductDeleted())

            }
            );

            return;
        }
        dispatch(getAdminProduct)
    }, [error, dispatch, prodectError, isProductDeleted])


    return (
        <div className="">
            <Box className=''>

                <Sidebar />
            </Box>
            <div className="productList">
                <h1 className="mt-4 mb-3">Product List</h1>
                {loading ? <Loader /> : <MDBDataTable data={setProducts()}
                    bordered
                    striped
                    hover
                    className="pl-6 pr-6 OTable" />}

            </div>
        </div>
    )
}