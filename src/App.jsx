import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import ProductForm from './pages/ProductForm'
import Favorites from './pages/Favorites'
import Cart from './pages/Cart'

export default function App() {
  return <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/products/new" element={<ProductForm />} />
      <Route path="/products/:id/edit" element={<ProductForm mode="edit" />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <footer>Учебный проект Mini Marketplace</footer>
  </BrowserRouter>
}
