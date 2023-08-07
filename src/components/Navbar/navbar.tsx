import { useAppSelector } from '../../store/hooks';
import { getConnection, logOut } from '../../store/slices/connectionSlice';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { subscribeToWS } from '../../utils/utils';

const NavBar = () => {
  const dispatch = useDispatch();
  const connection = useAppSelector(getConnection);
  const isAuthenticated = connection.isAuthenticated;
  return (
    <nav className="bg-white border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap ">Chat App</span>
        <span>{`${connection.isAuthenticated ? `Logged in as ${connection.userName}` : `You are not logged in`}`}</span>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Home
              </Link>
            </li>

            {isAuthenticated && (
              <li>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(logOut());
                    subscribeToWS();
                  }}
                  className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  Sign Out
                </div>
              </li>
            )}

            <li>
              <Link
                to="/inbox"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Inbox
              </Link>
            </li>

            {!isAuthenticated && (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
