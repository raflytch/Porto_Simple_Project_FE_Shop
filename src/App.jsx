import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import { AuthMiddleware } from './middleware/authMiddleware';
import Navbar from './components/Fragments/Navbar';
import Homepage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NotFound from './pages/404';
import ProfileDetail from './pages/ProfileDetailPage';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthMiddleware>
                <div className="overflow-x-hidden">
                  <Navbar />
                  <Homepage />
                </div>
              </AuthMiddleware>
            }
          />
          <Route
            path="/cart"
            element={
              <AuthMiddleware>
                <div className="overflow-x-hidden">
                  <Navbar />
                  <CartPage />
                </div>
              </AuthMiddleware>
            }
          />
          <Route
            path="/product/:id"
            element={
              <AuthMiddleware>
                <ProductDetailPage />
              </AuthMiddleware>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <AuthMiddleware>
                <div className="overflow-x-hidden">
                  <Navbar />
                  <ProfileDetail />
                </div>
              </AuthMiddleware>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
