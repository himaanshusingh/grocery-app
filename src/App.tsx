import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";

// Page imports
import Splash from "@/pages/Splash";
import Onboarding from "@/pages/Onboarding";
import SignIn from "@/pages/SignIn";
import NumberPage from "@/pages/NumberPage";
import Verify from "@/pages/Verify";
import Location from "@/pages/Location";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import CategoryProducts from "@/pages/CategoryProducts";
import ProductDetails from "@/pages/ProductDetails";
import Search from "@/pages/Search";
import Favorites from "@/pages/Favorites";
import Cart from "@/pages/Cart";
import OrderSuccess from "@/pages/OrderSuccess";
import OrderFailed from "@/pages/OrderFailed";

// Layout for core app pages (requires Header & Mobile Bottom Nav)
function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Onboarding & Auth screens (no headers/footers) */}
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/number" element={<NumberPage />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/location" element={<Location />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Main Application flow (with Header and BottomNav layout) */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:category" element={<CategoryProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* Checkout outcome status screens */}
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-failed" element={<OrderFailed />} />

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
