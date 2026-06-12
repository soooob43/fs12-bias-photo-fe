import mockPhotoCardImage from '@/assets/images/img_photo_card_test.svg';

export const DEV_MOCK_CARD_ID = 'dev-mock-card';

export const DEV_MOCK_PHOTO_CARD = {
  cardId: DEV_MOCK_CARD_ID,
  title: '테스트 포토카드',
  imageUrl: mockPhotoCardImage.src,
  description: '판매 모달 동작 확인을 위한 테스트용 카드입니다.',
  grade: 'LEGENDARY',
  genre: '풍경',
  creator: 'DEV',
  minimumPrice: 1000,
  quantity: 1,
  ownershipIds: [],
  isMock: true,
};
