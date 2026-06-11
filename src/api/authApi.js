import { authFetch, authHeaderFetch } from './core/fetchClient';

export const login = () => {};
export const signup =
  () =>
  async ({ email, nickname, password }) => {
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
export const logout = () => {};
export const getMe = () => authHeaderFetch('/users/me');

export const googleLogin = () => {};
