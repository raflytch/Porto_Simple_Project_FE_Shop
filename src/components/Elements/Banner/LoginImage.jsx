import Banner from '../../../../public/BannerTwo.jpg';

const LoginImage = () => (
  <div className="w-1/2 hidden h-screen lg:block relative overflow-hidden">
    <img
      src={Banner}
      alt="Login background"
      className="object-cover w-full h-full object-right"
    />
  </div>
);

export default LoginImage;
