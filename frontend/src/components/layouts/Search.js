import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from '@mui/material'
import { Search as Ser } from '@mui/icons-material'


export default function Search() {

    const navigate = useNavigate();
    const location = useLocation();
    const [keyword, setKeyword] = useState("")

    const searchHandler = (e) => {
        e.preventDefault();
        navigate(`/search/${keyword}`)

    }

    const clearKeyword = () => {
        setKeyword("");
    }

    useEffect(() => {
        if (location.pathname === '/') {
            clearKeyword();
        }
    }, [location])

    return (
        <form onSubmit={searchHandler}>
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => { setKeyword(e.target.value) }}
                    value={keyword}
                />

                    <Button variant='contained' onClick={searchHandler} color='secondary' disableElevation size='large' startIcon={<Ser />} />

            </div>
        </form>
    )
}