import { ReactNode } from 'react';
import Navbar from '../Navbar/navbar';

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
export default Layout;
