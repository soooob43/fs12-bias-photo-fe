import { authHeaderFetch } from './core/fetchClient';

export const getRandomBoxStatus = async () => {
  return authHeaderFetch('/points/random-box');
};

export const drawRandomBox = async () => {
  return authHeaderFetch('/points/random-box', {
    method: 'POST',
  });
};
