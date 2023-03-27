import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword, } from "../../actions/userActions";
import { toast } from "react-toastify";
import { Button } from "@mui/material";


export default function ForgotPassword() {
    const { loading, error, message } = useSelector(state => state.authState)
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotPassword(formData));
    }



    useEffect(() => {
        if (message) {
            toast(message, {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
            }
            );
            setEmail("");
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
    }, [message, error, dispatch])

    return (
        <Fragment>
            <div className="">
                <div className="input">
                    <form onSubmit={submitHandler} className="input__form">
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className=""
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <Button
                        variant="contained"
                            disabled={loading}
                            id="forgot_password_button"
                            type="submit"
                            className=" mt-5">
                            Send Email
                        </Button>

                    </form>
                </div>
            </div>
        </Fragment>
    )

}