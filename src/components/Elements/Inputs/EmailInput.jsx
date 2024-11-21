import { Mail } from 'lucide-react';

const EmailInput = ({ value, onChange }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text font-semibold">Username</span>
    </label>
    <label className="input input-bordered flex items-center gap-2">
      <Mail className="w-4 h-4" />
      <input
        type="text"
        className="grow"
        placeholder="raflytch"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  </div>
);

export default EmailInput;
