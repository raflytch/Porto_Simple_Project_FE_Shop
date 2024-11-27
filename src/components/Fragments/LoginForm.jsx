import { useForm } from 'react-hook-form';
import EmailInput from '../Elements/Inputs/EmailInput';
import PasswordInput from '../Elements/Inputs/PasswordInput';
import LoginButton from '../Elements/Buttons/LoginButton';
import SignUpSection from '../Elements/Sections/SignUpSection';
import Loading from '../Elements/Loading/Loading';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { login, isLoading } = useAuth();

  const onSubmit = async (data) => {
    await login(data);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Loading />
        </div>
      )}
      <div className="lg:w-1/2 px-8 md:px-12 lg:px-28 bg-base-100 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-4 text-primary">Welcome Back!</h2>
        <p className="text-lg text-gray-500 mb-8">
          Please login to continue accessing our services.
        </p>
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <EmailInput register={register} error={errors.username} />
          <PasswordInput register={register} error={errors.password} />
          <LoginButton />
        </form>
        <SignUpSection />
      </div>
    </>
  );
};

export default LoginForm;
