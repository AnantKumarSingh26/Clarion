import { useDispatch } from "react-redux";
import { register, login, getMe,logout } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";

export function useAuth() {
    const dispatch = useDispatch()
    async function handleRegister({ email, username, password }) {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            const data = await register({ email, username, password })
            return data
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || "Registration Failed!"
            dispatch(setError(errorMsg))
            throw error
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

    // !  -------------------------Logout -----------------------------

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