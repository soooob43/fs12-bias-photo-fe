import { Suspense } from 'react';
import OAuthCallback from './OAuthCallback';

const page = () => {
  <Suspense>
    <OAuthCallback />;
  </Suspense>;
};

export default page;
