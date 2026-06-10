import { authHeaderFetch } from './core/fetchClient';

export const login = () => {};
export const signup = () => {};
export const refresh = () => {};
export const logout = () => {};
export const getMe = () => authHeaderFetch('/users/me');

export const googleLogin = () => {};
