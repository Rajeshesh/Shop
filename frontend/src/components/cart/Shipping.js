import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { countries } from "countries-list"
import { useNavigate } from "react-router-dom"
import { saveShippingInfo } from "../../slices/cartSlice"
import CheckoutSteps from "./CheckoutSteps"
import { toast } from "react-toastify"
import {Button}from '@mui/material'

export const validateShipping = (shippingInfo, navigate) => {
    if (!shippingInfo.address ||
        !shippingInfo.city ||
        !shippingInfo.state ||
        !shippingInfo.country ||
        !shippingInfo.phoneNo ||
        !shippingInfo.postalCode
    ) {
        toast.error('please fill the shipping information',{position:toast.POSITION.BOTTOM_CENTER})
        navigate("/shipping")
    }
}

export default function Shipping() {
    const { shippingInfo={} } = useSelector(state => state.cartState)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [country, setCountry] = useState(shippingInfo.country)
    const [state, setState] = useState(shippingInfo.country)

    const countryList = Object.values(countries)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country, state }))
        navigate('/order/confirm')
    }


    return (
        <Fragment>
            <CheckoutSteps shipping />
            <div className="">
                <div className="shipping p-30">
                    <form onSubmit={submitHandler} className="shipping__form  ">
                        <h1 className="mb-6">Shipping Info</h1>
                        <div className="mb-3">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                                {countryList.map((country, i) => (
                                    <option key={i} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="">
                            <label htmlFor="State_field">State</label>
                            <input
                                type="text"
                                id="State_field"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </div>

                        <Button
                        variant="contained"
                            type="submit"
                            className="mt-4"
                        >
                            CONTINUE
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}