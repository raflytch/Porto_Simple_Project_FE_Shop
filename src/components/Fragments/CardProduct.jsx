import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa6';
import { MdOutlineRateReview } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from '../../features/cart/cartSlice';

const CardProduct = ({ product, loading = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (loading) {
    return <ProductSkeleton />;
  }

  if (!product) {
    return null;
  }

  const truncateTitle = (title, maxLength = 30) => {
    return title.length > maxLength
      ? `${title.substring(0, maxLength)}...`
      : title;
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    const isMobile = window.innerWidth <= 640;
    toast.success(
      `${truncateTitle(product.title)} has been added to your cart`,
      {
        position: isMobile ? 'bottom-center' : 'top-left',
        autoClose: 1500,
      }
    );
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="card bg-base-100 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300 rounded-t-2xl"
      onClick={handleCardClick}
    >
      <ToastContainer />
      <div className="card-body p-0">
        <figure className="relative pt-[75%] rounded-t-2xl overflow-hidden p-4">
          <img
            src={product.image}
            alt={product.title || 'Product Image'}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </figure>
        <div className="p-4 sm:p-6">
          <h2 className="card-title text-sm sm:text-base flex flex-col sm:flex-row items-start sm:items-center">
            <span className="flex-grow">{truncateTitle(product.title)}</span>
            <div className="badge badge-secondary badge-sm mt-1 sm:mt-0">
              {product.category.split(' ')[0]}
            </div>
          </h2>
          <p className="text-xs sm:text-sm line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <FaStar className="text-yellow-500 w-4 h-4" />
            <span>{product.rating?.rate || 'N/A'}</span>
            <MdOutlineRateReview className="w-4 h-4" />
            <span>{product.rating?.count || 0} reviews</span>
          </div>
          <div className="card-actions justify-between items-center mt-2">
            <span className="text-base sm:text-xl font-bold">
              ${product.price}
            </span>
            <button
              className="btn btn-primary btn-sm sm:btn-md"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductSkeleton = () => {
  return (
    <div className="card bg-base-100 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto shadow-xl rounded-t-2xl">
      <div className="card-body p-0">
        <div className="p-4">
          <Skeleton height={300} className="w-full rounded-t-2xl" />
        </div>
        <div className="p-4 sm:p-6">
          <Skeleton height={24} width={150} className="mb-2 sm:mb-4" />
          <Skeleton count={2} className="mb-2 sm:mb-4" />
          <div className="flex justify-between items-center mt-2">
            <Skeleton width={80} height={24} />
            <Skeleton width={100} height={36} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
