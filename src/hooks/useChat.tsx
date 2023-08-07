import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { getConnection } from '../store/slices/connectionSlice';
import { registerChatHandler, revokeChatHandler } from '../utils/utils';

const useChat = () => {
  const [toggledUser, setToggledUser] = useState<string>('public');
  const connection = useAppSelector(getConnection);

  useEffect(() => {
    const hubInstance = connection.connectionInstance;
    if (hubInstance) {
      registerChatHandler({
        handlerName: 'BroadcastChat',
        target: 'public',
        hubInstance,
      });
    }
    return () => {
    if (hubInstance) {
        revokeChatHandler({
          handlerName: 'BroadcastChat',
          hubInstance,
        });
      }
    };
  }, [connection.connectionInstance]);

  useEffect(() => {
    const hubInstance = connection.connectionInstance;
    if (hubInstance) {
      registerChatHandler({
        handlerName: 'ReceiveMessage',
        hubInstance,
      });
    }
    return () => {
      if (hubInstance) {
        revokeChatHandler({
          handlerName: 'ReceiveMessage',
          hubInstance,
        });
      }
    };
  }, [connection.connectionInstance]);

  return {
    toggledUser,
    setToggledUser,
  };
};
export default useChat;
