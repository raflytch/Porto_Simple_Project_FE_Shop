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
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
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
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        Profile Details
      </h2>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Skeleton height={32} width={200} className="mb-4" />
            <div className="space-y-2">
              <Skeleton height={24} width={150} />
              <Skeleton height={24} width={200} />
              <Skeleton height={24} width={180} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Skeleton height={32} width={200} className="mb-4" />
            <div className="space-y-2">
              <Skeleton height={24} width={120} />
              <Skeleton height={24} width={180} />
            </div>
          </div>
          <div className="sm:col-span-2 bg-white rounded-lg shadow-md p-6">
            <Skeleton height={32} width={120} className="mb-4" />
            <Skeleton height={24} width={300} />
          </div>
        </div>
      ) : error ? (
        <p className="text-red-500">{`Error fetching profile data: ${error.message}`}</p>
      ) : profile ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Name:</span>{' '}
                {`${profile.name.firstname} ${profile.name.lastname}`}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {profile.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> {profile.phone}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Account Details
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">ID:</span> {profile.id}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Username:</span>{' '}
                {profile.username}
              </p>
            </div>
          </div>
          <div className="sm:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Address
            </h3>
            <p className="text-gray-600">
              {`${profile.address.street}, ${profile.address.city}, ${profile.address.zipcode}`}
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
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
