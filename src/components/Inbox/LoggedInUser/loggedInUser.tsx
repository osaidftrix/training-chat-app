import { IUserList } from "../UserList/userlist";

interface ILoggedInUser extends IUserList {
  username: string;
}
const LoggedInUser: React.FC<ILoggedInUser> = (props) => {
  const { username, toggledUser, setToggledUser } = props;
  return (
    <div
      className={`${
        username === toggledUser ? 'bg-gray-300' : ''
      } cursor-pointer flex flex-row py-4 px-2 justify-center items-center border-b-2`}
      onClick={() => {
        setToggledUser(username);
      }}
    >
      <div className="w-1/4">
        <div
          className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full`}
        >
          <span className="font-medium text-gray-600">{username.toLocaleUpperCase()[0]}</span>
        </div>
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{username}</div>
      </div>
    </div>
  );
};
export default LoggedInUser;
