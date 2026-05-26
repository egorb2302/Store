import { Route, Routes } from "react-router";
import type { User } from "./types/types";
import { useEffect, lazy, Suspense } from 'react';

const NotFound = lazy(() => import("./pages/NotFound"));
const Catalog = lazy(() => import("./pages/Catalog"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import('./pages/Cart'));
const Profile = lazy(() => import("./pages/Profile"));

import Home from "./pages/Home";
import About from "./pages/About";
import HeaderLayout from "./components/HeaderLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./pages/Login";
import useAuthStore from "./stores/auth";
import SignUp from "./pages/SignUp";
import { SuspenseFallback } from "./components/SuspenseFallback";

export default function App() {
  const { isAuth, checkAuth, logout, setUser } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleLogin = (data: User) => {
    setUser(data)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <Suspense fallback={<SuspenseFallback/>}>
      <Routes>
        <Route path="/" element={<HeaderLayout/>}>

          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login onLogin={handleLogin} />}/>
          <Route path="/signup" element={<SignUp onSignUp={handleLogin}/>}/>
          <Route path="/about" element={<About/>}/>

          
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/products" element={<Catalog/>}/>
          <Route path="/products/:id" element={<Product/>}/>
          <Route path="/profile" element={
            <ProtectedRoutes isAuth={isAuth} redirectTo="/login">
              <Profile onLogout={handleLogout}/>
            </ProtectedRoutes>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </Suspense>
  )
}