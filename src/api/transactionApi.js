import { authHeaderFetch } from './core/fetchClient';

export const fetchAvailableCards = () => {
  return authHeaderFetch('/transactions/available-cards');
};

export const createTransaction = (transactionData) => {
  return authHeaderFetch('/transactions', {
    method: 'POST',
    body: JSON.stringify(transactionData),
  });
};
