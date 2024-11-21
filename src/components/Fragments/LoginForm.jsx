import { useState } from 'react';
import EmailInput from '../Elements/Inputs/EmailInput';
import PasswordInput from '../Elements/Inputs/PasswordInput';
import LoginButton from '../Elements/Buttons/LoginButton';
import SignUpSection from '../Elements/Sections/SignUpSection';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ username, password });
  };

  return (
    <div className="lg:w-1/2 px-8 md:px-12 lg:px-28 bg-base-100 flex flex-col justify-center">
      <h2 className="text-4xl font-bold mb-4 text-primary">Welcome Back!</h2>
      <p className="text-lg text-gray-500 mb-8">
        Please login to continue accessing our services.
      </p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <EmailInput value={username} onChange={setUsername} />
        <PasswordInput value={password} onChange={setPassword} />
        <LoginButton isLoading={isLoading} />
      </form>
      <SignUpSection />
    </div>
  );
};

export default LoginForm;
