import {
  authFetch,
  authHeaderFetch,
  cookieFetch,
  createUrl,
} from './core/fetchClient';

export const login = async ({ email, password }) => {
  return authFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });
};
export const signup = async ({ email, nickname, password }) => {
  return authFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      email,
      nickname,
      password,
    }),
  });
};
export const refresh = () => {};
export const logout = async () => {
  try {
    await fetch(createUrl('/auth/logout'), {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
    });
  } catch (error) {
    console.error(error);
  }
};

export const getMe = async () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return { user: null };
  }

  return authHeaderFetch('/users/me');
};

export const googleLogin = () => {};
