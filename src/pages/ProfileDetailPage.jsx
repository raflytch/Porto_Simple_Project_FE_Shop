import React from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAuth } from '../hooks/useAuth';
import useProfile from '../hooks/useDetailProfile';

const ProfileDetail = () => {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const { profile, isLoading, error } = useProfile(id);

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3B82F6',
      cancelButtonColor: '#F87171',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        toast.success('Logged out successfully!', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      } else {
        toast.error('Logout cancelled', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-8 sm:p-12">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Profile Details</h2>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Skeleton height={40} width={240} className="mb-6" />
            <div className="space-y-4">
              <Skeleton height={28} width={180} />
              <Skeleton height={28} width={240} />
              <Skeleton height={28} width={200} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Skeleton height={40} width={240} className="mb-6" />
            <div className="space-y-4">
              <Skeleton height={28} width={150} />
              <Skeleton height={28} width={200} />
            </div>
          </div>
          <div className="sm:col-span-2 bg-white rounded-lg shadow-lg p-8">
            <Skeleton height={40} width={150} className="mb-6" />
            <Skeleton height={28} width={360} />
          </div>
        </div>
      ) : error ? (
        <p className="text-red-500">{`Error fetching profile data: ${error.message}`}</p>
      ) : profile ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Personal Information
            </h3>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                <span className="font-medium">Name:</span>{' '}
                {`${profile.name.firstname} ${profile.name.lastname}`}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-medium">Email:</span> {profile.email}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-medium">Phone:</span> {profile.phone}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Account Details
            </h3>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                <span className="font-medium">ID:</span> {profile.id}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-medium">Username:</span>{' '}
                {profile.username}
              </p>
            </div>
          </div>
          <div className="sm:col-span-2 bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Address
            </h3>
            <p className="text-gray-700 text-lg">
              {`${profile.address.street}, ${profile.address.city}, ${profile.address.zipcode}`}
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-12 flex justify-end">
        <button
          onClick={handleLogout}
          className="py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>

      <ToastContainer
        position="bottom-right"
        className="sm:bottom-8 sm:right-8"
      />
    </div>
  );
};

export default ProfileDetail;
