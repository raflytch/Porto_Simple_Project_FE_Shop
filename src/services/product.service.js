import axiosInstance from '../api/axiosInstance';

export const fetchAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/products', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return {
      success: true,
      data: response.data,
      categories: [
        'electronics',
        'jewelery',
        "men's clothing",
        "women's clothing",
      ],
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'An error occurred',
    };
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axiosInstance.get(`/products/category/${category}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return {
      success: true,
      data: response.data,
      categories: [
        'electronics',
        'jewelery',
        "men's clothing",
        "women's clothing",
      ],
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'An error occurred',
    };
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch product details',
    };
  }
};
