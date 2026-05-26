import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import HeaderLayout from "./components/HeaderLayout";
import { useEffect } from 'react';
import ProtectedRoutes from "./components/ProtectedRoutes";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import useAuthStore from "./stores/auth";
import type { User } from "./types/types";
import SignUp from "./pages/SignUp";

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
    <Routes>
      <Route path="/" element={<HeaderLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/products" element={<Catalog/>}/>
        <Route path="/products/:id" element={<Product/>}/>
        <Route path="/login" element={<Login onLogin={handleLogin} />}/>
        <Route path="/signup" element={<SignUp onSignUp={handleLogin}/>}/>
        <Route path="/profile" element={
          <ProtectedRoutes isAuth={isAuth} redirectTo="/login">
            <Profile onLogout={handleLogout}/>
          </ProtectedRoutes>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  )
}