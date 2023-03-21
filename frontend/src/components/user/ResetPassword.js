import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, resetPassword, } from "../../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";


export  default function ResetPassword(){
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
        if(user) {
            toast("Password Reset Success!",{
                    type: 'success',
                    position: toast.POSITION.BOTTOM_CENTER,
                }
            );
            setPassword("");
            setConfirmPassword("");
            navigate('/')
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
    },[user, error,dispatch,navigate])

    return (
        <Fragment>
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
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