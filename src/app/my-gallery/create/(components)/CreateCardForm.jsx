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

const CreateCardForm = () => {
  const router = useRouter();
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

  // const queryClient = useQueryClient();

  const postPhotoCardMutaion = useMutation({
    mutationFn: createPhotoCard,
    // 포토 카드 생성 성공, 실패 임시 테스트
    onSuccess: (data) => {
      console.log('서버 응답 데이터:', data);
      alert('카드 생성 성공!');
      // 추후 마이갤러리 페이지와 querykey 연동
      // queryClient.invalidateQueries({ queryKey: ['myCards'] });
      router.replace({
        pathname: '/create/success',
        query: { title: formData.title, grade: formData.grade },
      });
    },
    onError: (error) => {
      alert(`생성 실패: ${error.message}`);
      console.error(error);
      router.replace({
        pathname: '/create/fail',
        query: { title: formData.title, grade: formData.grade },
      });
    },
  });

  // formData 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // formData 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert('이미지 파일을 선택해주세요!');

    // formData 형변환
    const payloadData = {
      ...formData,
      genre: FILTER_KEY_MAP.genre[formData.genre] || formData.genre,
      grade: FILTER_KEY_MAP.grade[formData.grade] || formData.grade,
      minimumPrice: Number(formData.minimumPrice),
      totalQuantity: Number(formData.totalQuantity),
    };

    postPhotoCardMutaion.mutate({ file, data: payloadData });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[520px] flex flex-col gap-[2.25rem] md:gap-[4.0625rem]"
    >
      <TextField
        labelName="포토카드 이름"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="포토 카드 이름을 입력해주세요"
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
        labelName="최소 가격"
        name="minimumPrice"
        value={formData.minimumPrice}
        onChange={handleChange}
        placeholder="최소 가격을 입력해주세요"
      />
      <TextField
        labelName="총 발행량"
        name="totalQuantity"
        value={formData.totalQuantity}
        onChange={handleChange}
        placeholder="총 발행량을 입력해주세요"
      />
      <ImageUpload
        labelName="사진 업로드"
        name="image"
        file={file}
        setFile={setFile}
      />
      <TextAreaField
        labelName="포토카드 설명"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="카드 설명을 입력해주세요"
      />

      <PrimaryButton
        type="submit"
        className="py-[1.0625rem]"
        disabled={postPhotoCardMutaion.isPending}
      >
        {postPhotoCardMutaion.isPending ? '포토 카드 생성중...' : '생성하기'}
      </PrimaryButton>
    </form>
  );
};

export default CreateCardForm;
