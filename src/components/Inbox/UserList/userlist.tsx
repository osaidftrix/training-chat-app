import React, { useCallback, useEffect, useState } from 'react';
import RefreshIcon from '../../../assets/svgs/refresh';
import { useAppSelector } from '../../../store/hooks';
import { getConnection, setLoggedInUsers } from '../../../store/slices/connectionSlice';
import LoggedInUser from '../LoggedInUser/loggedInUser';
import { IChatWindow } from '../ChatWindow/chatWindow';
import { getLoggedInUsers } from '../../../utils/utils';
import { useDispatch } from 'react-redux';
import { HubConnection } from '@microsoft/signalr';
import { delay } from '../../../utils/utils';

export interface IUserList extends IChatWindow {}

const UserList: React.FC<IUserList> = (props) => {
  const [loading, setLoading] = useState(false);
  const connection = useAppSelector(getConnection);
  const dispatch = useDispatch();
  let { loggedInUsers } = connection;
  const { connectionInstance } = connection;
  loggedInUsers = [{ username: 'public' }, ...loggedInUsers];
  const onRefreshUserList = useCallback(
    (connectionInstance: HubConnection | null) => async (): Promise<void> => {
      setLoading(true);
      await delay(1000);
      if (!connectionInstance) return;
      const response = await getLoggedInUsers(connectionInstance);
      response && dispatch(setLoggedInUsers(response));
      setLoading(false);
    },
    [dispatch],
  );

  useEffect(() => {
    onRefreshUserList(connectionInstance)();
  }, [onRefreshUserList, connectionInstance]);

  return (
    <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
      <div className="flex justify-end cursor-pointer">
        <span className="mr-1">Refresh Users</span>
        <RefreshIcon spin={loading} onClick={onRefreshUserList(connectionInstance)} />
      </div>
      {loggedInUsers?.length < 1 && (
        <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
          <div className="w-full">
            <div className="text-lg font-semibold">{`No one is currently online`}</div>
          </div>
        </div>
      )}
      {loggedInUsers.map((user) => (
        <LoggedInUser {...user} {...props} key={user.username} />
      ))}
    </div>
  );
};
export default UserList;
