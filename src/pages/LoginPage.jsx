import LoginImage from '../components/Elements/Banner/LoginImage';
import LoginForm from '../components/Fragments/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center">
      <LoginImage />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
