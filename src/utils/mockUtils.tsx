import { delay } from './utils';

type handlers = 'GetLoggedInUsers';

export const mockHubInstance = () => {
  const GetLoggedInUsers = async (): Promise<string[]> => {
    await delay(2000);
    return ['testuser1', 'testuser2'];
  };
  const hubMethods = {
    GetLoggedInUsers,
  };
  return {
    invoke: async (handler: handlers) => await hubMethods[handler](),
  };
};

