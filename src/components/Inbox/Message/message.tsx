import { useAppSelector } from '../../../store/hooks';
import { IMessage, getConnection } from '../../../store/slices/connectionSlice';

const Message = (props: IMessage) => {
  const connection = useAppSelector(getConnection);
  const isSelf = props.username === connection.userName;
  return (
    <div className={`flex ${isSelf ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`message-bubble mr-2 py-3 px-4 ${isSelf ? 'bg-blue-500' : 'bg-green-500'} ${
          isSelf ? 'rounded-bl-3xl' : 'rounded-br-3xl'
        } rounded-tl-3xl rounded-tr-xl text-white`}
      >
        {props.message}
      </div>

      {!isSelf && <span className="self font-medium text-gray-400">{props.username}</span>}
    </div>
  );
};
export default Message;
