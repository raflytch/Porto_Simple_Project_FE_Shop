import Loading from '../Loading/Loading';

const LoginButton = ({ isLoading }) => (
  <div className="form-control mt-6">
    <button className="btn btn-primary" disabled={isLoading}>
      {isLoading ? <Loading /> : 'Login'}
    </button>
  </div>
);

export default LoginButton;
