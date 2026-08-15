import { createBrowserRouter } from "react-router"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import Dashboard from "../features/chat/pages/Dashboard"
import Protected from "../features/auth/components/Protected"
import PublicRoute from "../features/auth/components/PublicRoute"

export const router = createBrowserRouter([
    {
        path: '/login',
        element:
            <PublicRoute>
                <Login />
            </PublicRoute>
    },
    {
        path: '/register',
        element:
            <PublicRoute>
                <Register />
            </PublicRoute>
    },
    {
        path: '/',
        element:
            <Protected>
                <Dashboard />
            </Protected>
    }
])