import { Navigate } from "react-router";
import type { ProtectedRouteTypes } from "../types/types";

export default function ProtectedRoutes({ children, isAuth, redirectTo = "/login" }: ProtectedRouteTypes ) {
    if (!isAuth) {
        return <Navigate to={redirectTo} replace/>
    }

    return <>{children}</>
}