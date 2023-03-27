import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login, clearError } from "../../actions/userActions";
import MetaData from "../layouts/MetaData";
import { toast } from 'react-toastify';
import { Button } from "@mui/material";

export default function Login() {
    const { loading, error, isAuthenticated } = useSelector(state => state.authState)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation()

    const redirect = location.search ? ('/' + location.search.split('=')[1]) : '/';


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }


    useEffect(() => {
        console.log(redirect)

        if (isAuthenticated) {
            navigate(redirect)
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
    }, [dispatch, isAuthenticated, error, navigate, redirect])

    return (
        <Fragment>
            <MetaData title={'Login'} />
            <div className="">
                <div className="input">
                    <form className="input__form mt-10" onSubmit={submitHandler}>
                        <h1 className="mb-3">Login</h1>
                        <div className="">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className=""
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className=""
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input__form--a">
                            <Link to="/password/forgot" className=" mb-4">Forgot Password?</Link>

                        </div>

                        <div>
                            <Button
                                variant='contained'
                                id="login_button"
                                type="submit"
                                className="mt-5"
                                disabled={loading}
                            >
                                LOGIN
                            </Button>

                        </div>
                        <div className="input__form--a">

                            <Link to="/register" className="mt-3">New User?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )

}