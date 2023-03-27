import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser, updateuser } from "../../actions/userActions";
import { clearError, clearUserUpdated } from "../../slices/userSlice";
import Sidebar from "./Sidebar";


export default function UpdateUser() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id: userId } = useParams()

    const { loading, isUserUpdated, user = {}, error } = useSelector(state => state.userState)
    const { user: authUser } = useSelector(state => state.authState)

    const sumbitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('role', role)


        dispatch(updateuser(userId, formData))
    }

    useEffect(() => {
        if (isUserUpdated) {
            toast('Product Updated Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUserUpdated())

            }
            );
            // navigate('/admin/users')

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
        dispatch(getUser(userId))
    }, [isUserUpdated, error, dispatch])

    useEffect(() => {
        if (user._id) {
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }
    }, [user])

    return (


        <div className="">
            <Box className=''>
                <Sidebar />
            </Box>
            <div className="">
                <div className="input">
                    <form onSubmit={sumbitHandler} className="input__form" encType='multipart/form-data'>
                        <h1 className="mb-4">Update User</h1>

                        <div className="">
                            <label htmlFor="name_field">Name</label>
                            <input type="text" id="name_field" className="" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="">
                            <label htmlFor="price_field">Email</label>
                            <input type="text" id="price_field" className="" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="">
                            <label htmlFor="category_field">Role</label>
                            <select
                                disabled={user._id === authUser._id}
                                className="" id="category_field" onChange={(e) => setRole(e.target.value)} value={role}>
                                <option value='user'>User</option>
                                <option value='admin'>Admin</option>
                            </select>
                        </div>

                        <Button id="login_button"
                            disabled={loading}
                            variant='contained'
                            type="submit" className="mt-5">
                            UPDATE
                        </Button>

                    </form>
                </div>

            </div>
        </div>
    )
}