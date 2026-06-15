import { authHeaderFetch } from './core/fetchClient';

/*----------------------------------------
Cloudinary에 이미지 업로드하는 함수 - 최혜성
------------------------------------------*/
export const uploadImageToCloudinary = async (file) => {
  const signatureData = await authHeaderFetch('/cards/upload-signature');
  const { timestamp, signature, folder, apiKey, cloudName } = signatureData;
  const formData = new FormData();

  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('folder', folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    },
  );

  if (!res.ok) throw new Error('이미지 업로드에 실패했습니다.');
  return await res.json();
};

/*----------------------------------
      포토 카드 생성 API - 최혜성
------------------------------------*/
export const createPhotoCard = async ({ file, data }) => {
  const cloudinaryData = await uploadImageToCloudinary(file);

  return await authHeaderFetch('/cards', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      imageUrl: cloudinaryData.secure_url,
      imagePublicId: cloudinaryData.public_id,
    }),
  });
};
