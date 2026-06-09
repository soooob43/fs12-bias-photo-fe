import { defaultFetch } from './core/fetchClient'; // 공통 fetch 클라이언트 호출

export const fetchMarketDetail = async (transactionId) => {
  return await defaultFetch(`/market/${transactionId}`);
};
