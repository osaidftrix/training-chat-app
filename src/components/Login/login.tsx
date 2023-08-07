import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getConnection, ConnectionState, setConnection } from '../../store/slices/connectionSlice';

type Inputs = {
  userName: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    // watch
    // formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onLogin({ username: data.userName, password: data.password });
  };
  const dispatch = useAppDispatch();
  const connection = useAppSelector(getConnection);
useEffect(() => {
    if (connection.isAuthenticated) {
      navigate('/');
    }
  }, [connection, navigate]);

  const onLogin = async (user: { username: string; password: string }) => {
    if (!connection.connectionInstance) return;
    try {
      const login: { allowLogin: boolean; username: null | string } = await connection.connectionInstance.invoke(
        'Login',
        user,
      );
      if (login.allowLogin) {
        toast.success('User Logged In Successfully!', {
          position: 'top-right',
          autoClose: 200,
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'light',
        });
      } else {
        toast.error('Incorrect username or password', {
          position: 'top-right',
          autoClose: 200,
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'light',
        });
        return;
      }
      const connectionPayload: ConnectionState = {
        connectionInstance: connection.connectionInstance,
        connectionId: connection.connectionId,
        isAuthenticated: true,
        userName: user.username,
        loggedInUsers: [],
        messages: { public: [] },
      };
      dispatch(setConnection({ ...connectionPayload }));
    } catch (err) {
      console.log('Could not login: ', err);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form name="form" role="form" aria-label="form" className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">
                  Username
                </label>
                <input
                  {...register('userName')}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  password
                </label>
                <input
                  {...register('password')}
                  type="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>

              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{' '}
                <Link to={'/register'} className="font-medium text-primary-600 hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
