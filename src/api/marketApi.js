import { defaultFetch } from './core/fetchClient';

export const fetchTransactions = async ({
  pageParam = null,
  keyword,
  filterType,
  filterValue,
  sortBy,
  sortOrder,
}) => {
  const params = new URLSearchParams();

  params.append('limit', 12);

  if (pageParam) params.append('cursor', pageParam);
  if (keyword) params.append('keyword', keyword);
  if (filterType && filterValue) {
    params.append('filterType', filterType);
    params.append('filterValue', filterValue);
  }
  if (sortBy) params.append('sortBy', sortBy);
  if (sortOrder) params.append('sortOrder', sortOrder);

  const queryString = params.toString();

  return await defaultFetch(`/transactions?${queryString}`);
};

export const fetchTransactionsFilterMeta = async () => {
  return await defaultFetch(`/transactions/meta`);
};
