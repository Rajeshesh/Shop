import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, updateProfile } from "../../actions/userActions";
import { toast } from "react-toastify";
import { clearUpdateProfile } from "../../slices/authSlice";
import { Avatar, Button } from "@mui/material";

export default function UpdateProfile() {
    const { loading, error, user, isUpdated } = useSelector(state => state.authState)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPReview] = useState('/images/default_avatar.png');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('avatar', avatar);
        dispatch(updateProfile(formData));
    }

    const onChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPReview(reader.result);
                setAvatar(e.target.files[0])
            }

        }
        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            if (user.avatar) {
                setAvatarPReview(user.avatar)
            }
        }
        if (isUpdated) {
            toast('Profile Updated Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUpdateProfile())

            }
            );
            return;
        }
        if (error) {
            toast(error, {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearError())
            }
            );
            return;
        }
    }, [user, isUpdated, error, dispatch])

    return (
        <Fragment>
            <div className="">
                <div className="input">
                    <form onSubmit={submitHandler} className="input__form" encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className=""
                                name='name'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className="">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="text"
                                id="email_field"
                                className=""
                                name='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className=''>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <Avatar src={avatarPreview} />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        onChange={onChangeAvatar}
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <Button variant="contained" disabled={loading} type="submit" className="mt-4 mb-3" >Update</Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )

}