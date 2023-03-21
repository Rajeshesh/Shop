import axios from "axios"
import { adminOrderFail, adminOrderRequest, adminOrderSuccess, createOrderFail, createOrderRequest, createOrderSuccess, deleteOrderFail, deleteOrderRequest, deleteOrderSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess, updateOrderFail, updateOrderRequest, updateOrderSuccess, userOrderFail, userOrderRequest, userOrderSuccess } from "../slices/orderSlice"

export const createOrder = order => async (dispatch) => {
    try {
        dispatch(createOrderRequest)

        const { data } = await axios.post(`/api/v1/order/new`, order)
        dispatch(createOrderSuccess(data))

    } catch (err) {
        dispatch(createOrderFail(err.response.data.message))
    }
}

export const userOrders = async (dispatch) => {
    try {
        dispatch(userOrderRequest())

        const { data } = await axios.get(`/api/v1/myorders`)
        dispatch(userOrderSuccess(data))

    } catch (err) {
        dispatch(userOrderFail(err.response.data.message))
    }
}

export const orderDetail = id => async (dispatch) => {
    try {
        dispatch(orderDetailRequest())

        const { data } = await axios.get(`/api/v1/order/${id}`)
        dispatch(orderDetailSuccess(data))

    } catch (err) {
        dispatch(orderDetailFail(err.response.data.message))
    }
}

export const adminOrders = async (dispatch) => {
    try {
        dispatch(adminOrderRequest())

        const { data } = await axios.get(`/api/v1/admin/orders`)
        dispatch(adminOrderSuccess(data))

    } catch (err) {
        dispatch(adminOrderFail(err.response.data.message))
    }
}

export const deleteOrders = id => async (dispatch) => {
    try {
        dispatch(deleteOrderRequest())

        await axios.delete(`/api/v1/admin/order/${id}`)
        dispatch(deleteOrderSuccess())

    } catch (err) {
        dispatch(deleteOrderFail(err.response.data.message))
    }
}

export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch(updateOrderRequest())

        const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData)
        dispatch(updateOrderSuccess(data))

    } catch (err) {
        dispatch(updateOrderFail(err.response.data.message))
    }
}












