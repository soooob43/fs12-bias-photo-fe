'use client';

import { createPhotoCard } from '@/api/cardApi';
import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import ImageUpload from '@/components/ui/Input/ImageUpload';
import LabelDropdown from '@/components/ui/Input/LabelDropdown';
import TextAreaField from '@/components/ui/Input/TextAreaField';
import TextField from '@/components/ui/Input/TextField';
import { FILTER_CONFIG, FILTER_KEY_MAP } from '@/constants/filter';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { z } from 'zod';
import { createCardSchema } from '@/schemas/cardSchema';

const CreateCardForm = () => {
  const router = useRouter();
  const [touched, setTouched] = useState({});
  const [isRouting, setIsRouting] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '', // [String]
    description: '', // [String]
    grade: '', // [String]
    genre: '', // [String]
    minimumPrice: '', // [Number]
    totalQuantity: '', // [Number]
  });

  const gradeOptions = FILTER_CONFIG.grade.options;
  const genreOptions = FILTER_CONFIG.genre.options;

  const queryClient = useQueryClient();

  const postPhotoCardMutaion = useMutation({
    mutationFn: createPhotoCard,
    // 포토 카드 생성 성공 / 실패 시 결과 페이지로 이동
    onSuccess: () => {
      setIsRouting(true);
      queryClient.invalidateQueries({ queryKey: ['my-gallery'] });
      const resultData = { title: formData.title, grade: formData.grade };
      // 세션 스토리지로 잘못된 접근 차단
      sessionStorage.setItem('createCardResult', JSON.stringify(resultData));
      router.replace('/my-gallery/create/success');
    },
    onError: (error) => {
      setIsRouting(true);
      console.error(error);
      const resultData = { title: formData.title, grade: formData.grade };
      sessionStorage.setItem('createCardResult', JSON.stringify(resultData));
      router.replace('/my-gallery/create/fail');
    },
  });

  // 실시간 유효성 검사 진행
  const validationResult = createCardSchema.safeParse({
    ...formData,
    file,
  });

  const isFormValid = validationResult.success;
  const errorTree = isFormValid ? null : z.treeifyError(validationResult.error);

  // formData 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // formData 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사 미통과시 제출 차단
    if (!isFormValid) return;

    const trimmedFormData = Object.keys(formData).reduce((acc, key) => {
      const value = formData[key];
      // 문자열인 경우에만 trim() 적용
      acc[key] = typeof value === 'string' ? value.trim() : value;
      return acc;
    }, {});

    // formData 형변환
    const payloadData = {
      ...trimmedFormData,
      genre: FILTER_KEY_MAP.genre[formData.genre] || formData.genre,
      grade: FILTER_KEY_MAP.grade[formData.grade] || formData.grade,
      minimumPrice: Number(formData.minimumPrice),
      totalQuantity: Number(formData.totalQuantity),
    };

    postPhotoCardMutaion.mutate({ file, data: payloadData });
  };

  const isProcessing = postPhotoCardMutaion.isPending || isRouting;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[520px] flex flex-col gap-[2.25rem] md:gap-[4.0625rem]"
      autoComplete="off"
    >
      <TextField
        type="text"
        labelName="포토카드 이름"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="포토 카드 이름을 입력해주세요"
        errorMsg={
          touched.title ? errorTree?.properties?.title?.errors?.[0] : null
        }
      />
      <LabelDropdown
        labelName="등급"
        name="grade"
        value={formData.grade}
        onChange={handleChange}
        options={gradeOptions}
        widthClass="max-w-[32.5rem]"
      />
      <LabelDropdown
        labelName="장르"
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        options={genreOptions}
        widthClass="max-w-[32.5rem]"
      />
      <TextField
        type="number"
        labelName="가격"
        name="minimumPrice"
        value={formData.minimumPrice}
        onChange={handleChange}
        placeholder="가격을 입력해주세요"
        errorMsg={
          touched.minimumPrice
            ? errorTree?.properties?.minimumPrice?.errors?.[0]
            : null
        }
        onWheel={(e) => e.target.blur()}
        maxLength={10}
      />
      <TextField
        type="number"
        labelName="총 발행량"
        name="totalQuantity"
        value={formData.totalQuantity}
        onChange={handleChange}
        placeholder="총 발행량을 입력해주세요"
        errorMsg={
          touched.totalQuantity
            ? errorTree?.properties?.totalQuantity?.errors?.[0]
            : null
        }
        onWheel={(e) => e.target.blur()}
        maxLength={2}
      />
      <ImageUpload
        labelName="사진 업로드"
        name="image"
        file={file}
        setFile={setFile}
        errorMsg={
          touched.file ? errorTree?.properties?.file?.errors?.[0] : null
        }
      />
      <TextAreaField
        labelName="포토카드 설명"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="카드 설명을 입력해주세요"
        errorMsg={
          touched.description
            ? errorTree?.properties?.description?.errors?.[0]
            : null
        }
      />

      <PrimaryButton
        type="submit"
        className="py-[1.0625rem]"
        disabled={!isFormValid || isProcessing}
      >
        {isProcessing ? '포토 카드 생성중...' : '생성하기'}
      </PrimaryButton>
    </form>
  );
};

export default CreateCardForm;
