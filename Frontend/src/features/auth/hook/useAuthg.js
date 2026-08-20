import { useDispatch } from "react-redux";
import { register, login, getMe,logout } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";

export function useAuth() {
    const dispatch = useDispatch()
    //!-------------------------- REGISTER ----------------------------------
    async function handleRegister({ email, username, password }) {
        try {
            dispatch(setLoading(true))
            const data = await register({ email, username, password })
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration Failed!"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    //!----------------------------- LOGIN -----------------------------------
    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true))
            const data = await login({ email, password })
            dispatch(setUser(data.user))
            return data
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login Failed! Try Again."))
            throw error
        } finally {
            dispatch(setLoading(false))
        }
    }
    // ! ------------------------- GET-ME -------------------------------------------
    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user));

        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to Load Account Details"))
        } finally {
            dispatch(setLoading(false))
        }
    }
     async function handleLogout() {
        try {
            await logout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            dispatch(setUser(null));
        }
    }

    return {
        handleGetMe,
        handleLogin,
        handleRegister,
        handleLogout
    }
}