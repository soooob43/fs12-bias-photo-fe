import { FILTER_KEY_MAP } from './filter';

export const MY_SALES_FILTER_CONFIG = {
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

  saleMethod: {
    label: '판매방법',
    options: ['판매', '교환'],
  },

  soldOut: {
    label: '매진여부',
    options: ['판매중', '품절'],
  },
};

export const MY_SALES_FILTER_KEY_MAP = {
  grade: FILTER_KEY_MAP.grade,

  genre: FILTER_KEY_MAP.genre,

  saleMethod: {
    판매: 'SALE',
    교환: 'EXCHANGE',
  },

  soldOut: {
    판매중: false,
    품절: true,
  },
};
