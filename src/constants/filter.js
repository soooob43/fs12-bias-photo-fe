export const FILTER_CONFIG = {
  grade: {
    label: '등급',
    options: ['COMMON', 'RARE', 'SUPER RARE', 'LEGENDARY'],
  },
  genre: {
    label: '장르',
    options: [
      '앨범',
      '특전',
      '팬싸',
      '시즌그리팅',
      '팬미팅',
      '콘서트',
      'MD',
      '콜라보',
      '팬클럽',
      '기타',
    ],
  },
  saleStatus: {
    label: '판매 상태',
    options: ['판매 중', '판매 완료'],
  },
  sort: {
    label: '정렬',
    options: ['최신순', '오래된순', '낮은 가격순', '높은 가격순'],
  },
};

export const FILTER_KEY_MAP = {
  grade: {
    COMMON: 'COMMON',
    RARE: 'RARE',
    'SUPER RARE': 'SUPER_RARE',
    LEGENDARY: 'LEGENDARY',
  },
  genre: {
    앨범: 'ALBUM',
    특전: 'BENEFIT',
    팬싸: 'FAN_SIGN',
    시즌그리팅: 'SEASON_GREETING',
    팬미팅: 'FAN_MEETING',
    콘서트: 'CONCERT',
    MD: 'MD',
    콜라보: 'COLLAB',
    팬클럽: 'FAN_CLUB',
    기타: 'ETC',
  },
  saleStatus: {
    '판매 중': 'ON_SALE',
    '판매 완료': 'SOLD_OUT',
  },
  sort: {
    최신순: { sortBy: 'DATE', sortOrder: 'DESC' },
    오래된순: { sortBy: 'DATE', sortOrder: 'ASC' },
    '낮은 가격순': { sortBy: 'PRICE', sortOrder: 'ASC' },
    '높은 가격순': { sortBy: 'PRICE', sortOrder: 'DESC' },
  },
};

// 둥급에 따른 색깔 설정 객체
export const GRADE_TEXT_COLOR = {
  COMMON: 'text-(--main-main)',
  RARE: 'text-(--blue-blue)',
  'SUPER RARE': 'text-(--purple-purple)',
  LEGENDARY: 'text-(--pink-pink)',
};
