import { Link, useNavigate } from 'react-router-dom';
import { getConnection } from '../../store/slices/connectionSlice.js';
import { useAppSelector } from '../../store/hooks.js';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

type Inputs = {
  userName: string;
  password: string;
};

const Register = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onRegister({ username: data.userName, password: data.password });
  };

  const connection = useAppSelector(getConnection);
  useEffect(() => {
    if (connection.isAuthenticated) {
      navigate('/');
    }
  }, [connection, navigate]);

  const onRegister = async (user: { username: string; password: string }) => {
    if (!connection.connectionInstance) return;
    try {
      const register = await connection.connectionInstance.invoke('Register', user);

      if (register) {
        toast.success('User Registered Successfully!', {
          position: 'top-right',
          autoClose: 200,
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'light',
        });
        navigate('/login');
      } else {
        toast.error('User Already Registered', {
          position: 'top-right',
          autoClose: 200,
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'light',
        });
        return;
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Register to Chat
            </h1>
            <form name="form" role="form" aria-label="form" className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Username
                </label>
                <input
                  {...register('userName')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  {...register('password')}
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Register
              </button>

              <p className="text-sm font-light text-gray-500">
                Already Registered?{' '}
                <Link to={'/login'} className="font-medium text-primary-600 hover:underline">
                  Login Here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Register;
