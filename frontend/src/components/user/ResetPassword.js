import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, resetPassword, } from "../../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";


export default function ResetPassword() {
    const { loading, error, user } = useSelector(state => state.authState)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        dispatch(resetPassword(formData, token));
    }




    useEffect(() => {
        if (user) {
            toast("Password Reset Success!", {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
            }
            );
            setPassword("");
            setConfirmPassword("");
            navigate('/')
            return;
        }
        if (error) {
            toast(error, {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearError)
            }
            );
            return;
        }
    }, [user, error, dispatch, navigate])

    return (
        <Fragment>
            <div className="">
                <div className="input">
                    <form className="input__form" onSubmit={submitHandler}>
                        <h1 className="mb-3">New Password</h1>

                        <div className="">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className=""
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <Button
                            disabled={loading}
                            variant='contained'
                            type="submit"
                            className="mt-5">
                            Set Password
                        </Button>

                    </form>
                </div>
            </div>
        </Fragment>
    )

}