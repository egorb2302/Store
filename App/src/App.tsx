import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import HeaderLayout from "./components/HeaderLayout";
import useAuthStore from "./stores/auth";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HeaderLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/products" element={<Catalog/>}/>
        <Route path="/products/:id" element={<Product/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  )
}