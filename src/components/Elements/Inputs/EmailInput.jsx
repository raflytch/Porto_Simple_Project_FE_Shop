import { Mail } from 'lucide-react';

const EmailInput = ({ register, error }) => (
  <div className="form-control relative">
    <label className="label">
      <span className="label-text font-semibold">Username</span>
    </label>
    <label
      className={`input input-bordered flex items-center gap-2 ${error ? 'input-error' : ''}`}
    >
      <Mail className="w-4 h-4" />
      <input
        type="text"
        className="grow"
        placeholder="raflytch"
        {...register('username', {
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username must be at least 3 characters',
          },
        })}
      />
    </label>
    {error && (
      <span className="text-xs text-error absolute -bottom-5">
        {error.message}
      </span>
    )}
  </div>
);

export default EmailInput;
