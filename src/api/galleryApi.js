import { authHeaderFetch } from './core/fetchClient';

export const fetchMyGallery = () => {
  return authHeaderFetch('/gallery');
};
