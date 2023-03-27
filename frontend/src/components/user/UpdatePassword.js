import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, UpdatePassword as UpdatePasswordAction } from "../../actions/userActions";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

export  default function UpdatePassword(){
    const { loading, error, user, isUpdated } = useSelector(state => state.authState)
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('oldPassword', oldPassword);
        formData.append('password', password);
        dispatch(UpdatePasswordAction(formData));
    }

    

    useEffect(() => {
        if(isUpdated) {
            toast('Password Updated Successfully!',{
                    type: 'success',
                    position: toast.POSITION.BOTTOM_CENTER,
                }
            );
            setOldPassword("");
            setPassword("");
            return;
        }
        if(error) {
            toast(error,{
                    type: 'error',
                    position: toast.POSITION.BOTTOM_CENTER,
                    onOpen: () => dispatch(clearError)
                }
            );
            return;
        }
    },[user, isUpdated, error,dispatch])

    return (
        <Fragment>
         <div className="">
            <div className="input">
                <form onSubmit={submitHandler} className="input__form">
                    <h1 className="mb-3">New Password</h1>

                    <div className="">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className=""
                            onChange={(e)=>setOldPassword(e.target.value)}
                            value={oldPassword}
                        />
                    </div>

                    <div className="">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className=""
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
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