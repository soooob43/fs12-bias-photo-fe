import { authHeaderFetch } from './core/fetchClient';

export const fetchAvailableCards = () => {
  return authHeaderFetch('/transactions/available-cards');
};

//판매하기 모달
export const createTransaction = (transactionData) => {
  return authHeaderFetch('/transactions', {
    method: 'POST',
    body: JSON.stringify(transactionData),
  });
};

//수정하기 모달
export const updateTransaction = (transactionId, transactionData) => {
  return authHeaderFetch(`/transactions/${transactionId}`, {
    method: 'PATCH',
    body: JSON.stringify(transactionData),
  });
};
