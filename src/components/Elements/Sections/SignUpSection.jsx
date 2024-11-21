import { Link } from 'react-router-dom';

const SignUpSection = () => (
  <>
    <div className="divider">OR</div>
    <div className="text-center">
      <p>Don't have an account?</p>
      <Link to="/register" className="link-primary">
        Sign up now
      </Link>
    </div>
  </>
);

export default SignUpSection;
