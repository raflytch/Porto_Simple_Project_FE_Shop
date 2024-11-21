import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useAuth } from '../../hooks/useAuth';
import { FaCartShopping } from 'react-icons/fa6';
import { TbBrandFunimation } from 'react-icons/tb';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const cartState = useSelector((state) => state.cart);

  const { items: cartItems, totalQuantity, totalAmount } = cartState;

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: 'Logged Out',
          text: 'You have been successfully logged out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <nav className="navbar bg-base-100 shadow z-50 sticky top-0 px-4 sm:px-10 py-4">
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center space-x-2 btn btn-ghost text-lg sm:text-xl"
        >
          <TbBrandFunimation size={30} />
          <span className="hidden sm:inline">Raflytch</span>
        </Link>
      </div>
      <div className="flex-none">
        {/* Dropdown menu for cart */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <FaCartShopping className="w-6 h-6" />
              <span className="badge badge-sm indicator-item">
                {totalQuantity || 0}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">
                {totalQuantity || 0} Items
              </span>
              <span className="text-info">
                Subtotal: ${(totalAmount || 0).toFixed(2)}
              </span>
              <div className="card-actions">
                <Link to="/cart" className="btn btn-primary btn-block">
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* User Authentication */}
        {isAuthenticated && user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  {user.user}
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-ghost hidden sm:block">
            Login
          </Link>
        )}

        {/* Login button for mobile */}
        {!isAuthenticated && (
          <Link
            to="/login"
            className="btn btn-primary sm:hidden flex items-center"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
