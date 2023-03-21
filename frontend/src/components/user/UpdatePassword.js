import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, UpdatePassword as UpdatePasswordAction } from "../../actions/userActions";
import { toast } from "react-toastify";

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
         <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            onChange={(e)=>setOldPassword(e.target.value)}
                            value={oldPassword}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <button
                        disabled={loading}
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Set Password
                    </button>

                </form>
            </div>
        </div>
        </Fragment>
    )

}