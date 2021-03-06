import { fetchSinToken, fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from "sweetalert2";
import { taskLogout } from "./tasks";


export const startLogin = (email, password) => {
    return async(dispatch) => {

        const resp = await fetchSinToken('auth', {email, password}, 'POST');
        const body = await resp.json();

        if(body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))

        }else {

            if(body.errors) {
                    body.errors.password ? 
                    (
                        Swal.fire('Error', body.errors.password.msg,'error')
                    ): 
                    (
                        Swal.fire('Error', body.errors.email.msg,'error')
                    )
                 
                
            }else {
                Swal.fire('Error', body.message,'error');
            }
        }

    }
}

export const startRegister = (email, password, name) => {
    return async(dispatch) => {

        const resp = await fetchSinToken('auth/new', {email, password, name}, 'POST');
        const body = await resp.json();

        if(body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))

        }else {
            if(body.errors) {
                body.errors.password ? 
                (
                    Swal.fire('Error', body.errors.password.msg,'error')
                ): 
                body.errors.email ? 
                (
                    Swal.fire('Error', body.errors.email.msg,'error') 
                ) :
                (
                    Swal.fire('Error', body.errors.name.msg,'error') 
                )
             
            
            }else {
                Swal.fire('Error', body.message,'error');
            }
            
        }

    }
}

export const startChecking = () => {
    return async(dispatch) => {

        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();

        if(body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))

        }else {
            dispatch(checkingFinish());
        }

    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
});

const login = (user) => ({
    type: types.authLogin,
    payload: user
});


export const startLogout = () => {
    return (dispatch) => {

        localStorage.clear();
        dispatch(taskLogout());
        dispatch(logout());

    }
}

const logout = () => ({type: types.authLogout})
