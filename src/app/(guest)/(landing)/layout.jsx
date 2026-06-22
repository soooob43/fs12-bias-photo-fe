import LandingHeader from './(components)/LandingHeader';

const layout = ({ children }) => {
  return (
    <>
      <LandingHeader />
      {children}
    </>
  );
};

export default layout;
