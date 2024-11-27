import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const PasswordInput = ({ register, error }) => (
  <div className="form-control relative mt-6">
    <label className="label">
      <span className="label-text">Password</span>
    </label>
    <label
      className={`input input-bordered flex items-center gap-2 ${error ? 'input-error' : ''}`}
    >
      <Lock className="w-4 h-4" />
      <input
        type="password"
        className="grow"
        placeholder="Enter password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
      />
    </label>
    {error && <span className="text-xs text-error mt-1">{error.message}</span>}
    <label className="label mt-2">
      <Link to="/forgot-password" className="label-text-alt link link-hover">
        Forgot password?
      </Link>
    </label>
  </div>
);

export default PasswordInput;
