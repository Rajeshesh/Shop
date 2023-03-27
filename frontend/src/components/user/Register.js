import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";

export default function Register() {
    const { loading, error, isAuthenticated } = useSelector(state => state.authState)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPReview] = useState('/images/default_avatar.png');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('avatar', avatar);
        dispatch(register(formData));
    }

    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPReview(reader.result);
                    setAvatar(e.target.files[0])
                }

            }
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value })
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
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
    }, [error, isAuthenticated, navigate, dispatch])

    return (
        <Fragment>
            <div className="">
                <div className="input">
                    <form className="input__form mt-7" onSubmit={submitHandler} encType='multipart/form-data' >
                        <h1 className="mb-3">Register</h1>
                        <div className="">
                            <label htmlFor="email_field">Name</label>
                            <input
                                name="name"
                                type="text"
                                id="name_field"
                                className=""
                                onChange={onChange}
                            />
                        </div>

                        <div className="">
                            <label htmlFor="email_field">Email</label>
                            <input
                                name="email"
                                text="text"
                                id="email_field"
                                className=""
                                onChange={onChange}

                            />
                        </div>

                        <div className="">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password_field"
                                className=""
                                onChange={onChange}

                            />
                        </div>

                        <div className='RAvatar mt-5 mb-5'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className=''>
                                <div>
                                    <figure className=''>
                                        <Avatar src={avatarPreview} />

                                    </figure>
                                </div>
                                <div className=''>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className=''
                                        id='customFile'
                                        accept="images/*"
                                        placeholder=""
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            variant="contained"
                            type="submit"
                            className=""
                            disabled={loading}
                        >
                            REGISTER
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )

}