import { useDispatch, useSelector } from "react-redux"
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { clearError } from "../../slices/productsSlice"
import { deleteProduct, getAdminProduct } from "../../actions/productActions"
import Sidebar from "./Sidebar"
import Loader from '../layouts/Loader'
import { MDBDataTable } from 'mdbreact'
import { toast } from "react-toastify"
import { clearProductDeleted } from "../../slices/productSlice"

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
                    <>
                        <Link className="btn btn-primary" to={`/admin/product/${product._id}`}><i className="fa fa-pencil"></i></Link>
                        <Button onClick={(e) => deleteHandler(e, product._id)} className="btn btn-danger py-1 px-2 ml-2"><i className="fa fa-trash"></i></Button>
                    </>)
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
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Product List</h1>
                <>
                    {loading ? <Loader /> : <MDBDataTable data={setProducts()}
                        bordered
                        striped
                        hover
                        className="px-3 OTable" />}
                </>

            </div>
        </div>
    )
}