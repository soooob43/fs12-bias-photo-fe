import { authHeaderFetch } from './core/fetchClient';

// export const fetchMyGallery = () => {
//   return authHeaderFetch('/gallery');
// };

/*---------------------------
 마이갤러리 fetchMyGallery 작업 
  add : 2026.06.15 윤소정
----------------------------*/

export const fetchMyGallery = ({
  page = 1,
  limit = 6,
  keyword = '',
  grade = '',
  genre = '',
} = {}) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (keyword) {
    params.set('keyword', keyword);
  }

  if (grade) {
    params.set('grade', grade);
  }

  if (genre) {
    params.set('genre', genre);
  }

  return authHeaderFetch(`/gallery?${params.toString()}`);
};
