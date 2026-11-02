import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CartPage } from '@/pages/cart'
import { FavoritesPage } from '@/pages/favorites'
import { ProductDetailsPage } from '@/pages/product-details'
import { ProductFormPage } from '@/pages/product-form'
import { ProductsPage } from '@/pages/products'
import { Header } from '@/widgets/header'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/new" element={<ProductFormPage />} />
        <Route path="/products/:id/edit" element={<ProductFormPage mode="edit" />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer>Учебный проект Mini Marketplace</footer>
    </BrowserRouter>
  )
}
