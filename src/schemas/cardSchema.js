import { z } from 'zod';

export const createCardSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, '포토 카드 이름을 입력해주세요.')
    .max(15, '제목은 15자 이하여야 합니다.'),
  grade: z.string().trim().min(1, '등급을 선택해주세요.'),
  genre: z.string().trim().min(1, '장르를 선택해주세요.'),
  minimumPrice: z
    .string()
    .trim()
    .min(1, '최소 가격을 입력해주세요.')
    .regex(/^[0-9]+$/, '소수점은 입력할 수 없습니다.')
    .refine((val) => Number(val) >= 1, '최소 가격은 1P 이상이어야 합니다.'),
  totalQuantity: z
    .string()
    .trim()
    .min(1, '총 발행량을 입력해주세요.')
    .regex(/^[0-9]+$/, '소수점은 입력할 수 없습니다.')
    .refine((val) => Number(val) >= 1, '총 발행량은 1장 이상이어야 합니다.')
    .refine(
      (val) => Number(val) <= 10,
      '총 발행량은 10장 이하로 선택 가능합니다.',
    ),
  file: z.any().refine((val) => val !== null, '이미지 파일을 선택해주세요.'),
  description: z
    .string()
    .trim()
    .min(1, '포토 카드 설명을 입력해주세요.')
    .max(255, '포토 카드 설명은 255자 이하여야 합니다.')
    .optional(),
});
