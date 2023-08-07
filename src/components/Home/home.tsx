import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { getConnection } from '../../store/slices/connectionSlice';

const Home = () => {
  const connection = useAppSelector(getConnection);
  const [dashboardContent, setDashboardContent] = useState('');
  useEffect(() => {
    (async () => {
      if (!connection.connectionInstance) return;
      try {
        const response = await connection.connectionInstance.invoke('GetDashboardContent');
        setDashboardContent(response);
      } catch (err) {
        console.log('err', err);
      }
    })();
  }, [connection.connectionInstance]);
  if (!connection.isAuthenticated) return null;
  return (
    <div className="m-auto block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{`Welcome ${connection.userName}`}</h5>
      <p className="font-normal text-gray-700">{dashboardContent}</p>
    </div>
  );
};
export default Home;
