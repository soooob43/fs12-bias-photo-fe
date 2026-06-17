import { defaultFetch, authHeaderFetch } from './core/fetchClient'; // 공통 fetch 클라이언트 호출

//상세 페이지 정보 조회
export const fetchMarketDetail = async (transactionId) => {
  return await defaultFetch(`/market/${transactionId}`);
};

//포토카드 구매하기
export const purchasePhotocardApi = async ({
  transactionId,
  buyerId,
  quantity,
}) => {
  return await authHeaderFetch(`/market/${transactionId}/purchase`, {
    method: 'POST',
    body: JSON.stringify({ buyerId, quantity }),
  });
};

//교환 제안하기
export const proposeExchangeApi = async ({
  transactionId,
  proposerId,
  offeredCardId,
  description,
}) => {
  return await defaultFetch(`/market/${transactionId}/exchange`, {
    method: 'POST',
    body: JSON.stringify({ proposerId, offeredCardId, description }),
  });
};

//교환 목록 조회
export const fetchExchangeOffers = async (transactionId) => {
  return await defaultFetch(`/market/${transactionId}/exchange`);
};

//교환제안 취소하기
export const deleteExchangeApi = async (exchangeOfferId) => {
  return await authHeaderFetch(`/market/exchange/${exchangeOfferId}`, {
    method: 'DELETE',
  });
};

//판매글 내리기
export const deleteMarketTransactionApi = async (transactionId) => {
  return await authHeaderFetch(`/market/${transactionId}`, {
    method: 'DELETE',
  });
};
