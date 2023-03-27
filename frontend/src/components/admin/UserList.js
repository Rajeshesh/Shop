import { useDispatch, useSelector } from "react-redux"
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { Fragment, useEffect } from "react"
import { clearError, clearUserDeleted } from "../../slices/userSlice"
import Sidebar from "./Sidebar"
import Loader from '../layouts/Loader'
import { MDBDataTable } from 'mdbreact'
import { toast } from "react-toastify"
import { deleteUser, getUsers } from "../../actions/userActions"
import { Box, IconButton } from "@mui/material"
import { DeleteOutline, Edit } from "@mui/icons-material"

export default function UserList() {
    const { users = [], loading = true, error, isUserDeleted } = useSelector(state => state.userState)
    const dispatch = useDispatch()
    const setUsers = () => {
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
                    label: 'Imail',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
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
        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions: (
                    <Fragment>
                        <IconButton color="primary">
                            <Link className="" to={`/admin/user/${user._id}`}><Edit /></Link>
                        </IconButton>
                        <IconButton color="secondary" aria-label="delete" onClick={(e) => deleteHandler(e, user._id)} className=""><DeleteOutline /></IconButton>
                    </Fragment>)
            })
        })
        return data
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true
        dispatch(deleteUser(id))
    }

    useEffect(() => {
        if (error) {
            toast(error, {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearError())
            })
        }

        if (isUserDeleted) {
            toast('User Deleted Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUserDeleted())

            });

            return;
        }
        dispatch(getUsers)
    }, [error, dispatch, isUserDeleted])


    return (
        <div className="">
            <Box className=''>

                <Sidebar />
            </Box>
            <div className="userList">
                <h1 className="mt-4 mb-4">User List</h1>
                <>
                    {loading ? <Loader /> : <MDBDataTable data={setUsers()}
                        bordered
                        striped
                        hover
                        className="pl-6 pr-6 OTable" />}
                </>

            </div>
        </div>
    )
}