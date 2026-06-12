import { authHeaderFetch } from './core/fetchClient';

export const fetchMySales = async ({
  page = 1,
  limit = 15,
  grade,
  genre,
  saleMethod,
  soldOut,
  keyword,
}) => {
  const params = new URLSearchParams();

  params.append('page', page);
  params.append('limit', limit);

  if (grade) {
    params.append('grade', grade);
  }

  if (genre) {
    params.append('genre', genre);
  }

  if (saleMethod) {
    params.append('saleMethod', saleMethod);
  }

  if (soldOut !== undefined && soldOut !== '') {
    params.append('soldOut', soldOut);
  }

  if (keyword) {
    params.append('keyword', keyword);
  }

  return await authHeaderFetch(`/my-sales?${params.toString()}`);
};
