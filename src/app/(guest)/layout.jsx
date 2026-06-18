import GuestRoute from '@/components/auth/GuestRoute';

const layout = ({ children }) => {
  return <GuestRoute>{children}</GuestRoute>;
};

export default layout;
