import useChat from '../../hooks/useChat';
import ChatWindow from './ChatWindow/chatWindow';
import UserList from './UserList/userlist';

const Inbox = () => {
  const { toggledUser, setToggledUser } = useChat();

  return (
    <div className="container mx-auto shadow-lg rounded-lg">
      <div className="flex flex-row justify-between">
        <UserList toggledUser={toggledUser} setToggledUser={setToggledUser} />
        <ChatWindow toggledUser={toggledUser} setToggledUser={setToggledUser} />
      </div>
    </div>
  );
};

export default Inbox;
