import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const PasswordInput = ({ value, onChange }) => (
  <div className="form-control mt-4">
    <label className="label">
      <span className="label-text">Password</span>
    </label>
    <label className="input input-bordered flex items-center gap-2">
      <Lock className="w-4 h-4" />
      <input
        type="password"
        className="grow"
        placeholder="Enter password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
    <label className="label">
      <Link to="/forgot-password" className="label-text-alt link link-hover">
        Forgot password?
      </Link>
    </label>
  </div>
);

export default PasswordInput;
