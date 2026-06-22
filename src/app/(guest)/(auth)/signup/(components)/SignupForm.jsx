'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import Input from '@/components/ui/Input/Input';
import PasswordInput from '@/components/ui/Input/PasswordInput';
import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import { useMutation } from '@tanstack/react-query';
import { signup } from '@/api/authApi';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './SignupForm.module.css';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';
import SignupSkeleton from '@/components/ui/Skeleton/SignupSkeleton';
import AlertButtonModal from '@/components/ui/AlertButtonModal/AlertButtonModal';

const signupSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, '이메일을 입력해주세요.')
      .email('이메일 형식이 올바르지 않습니다.'),

    password: z
      .string()
      .trim()
      .min(1, '비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .max(20, '비밀번호는 20자 이하여야 합니다.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
        '비밀번호는 영문, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.',
      ),

    passwordConfirm: z.string().trim(),

    nickname: z
      .string()
      .trim()
      .min(1, '닉네임을 입력해주세요.')
      .max(8, '닉네임은 8자 이하여야 합니다.')
      .regex(
        /^[가-힣a-zA-Z0-9_-]+$/,
        '닉네임은 한글, 영문, 숫자, -, _만 사용할 수 있습니다.',
      )
      .refine((value) => !/[-_]{2}/.test(value), {
        message: '특수문자는 연속해서 사용할 수 없습니다.',
      })
      .refine((value) => !/^[-_]|[-_]$/.test(value), {
        message: '특수문자는 시작이나 끝에 사용할 수 없습니다.',
      }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

const SignupFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get('redirect');

  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState({});

  const [modal, setModal] = useState({
    isOpen: false,
    message: '',
    success: false,
  });

  const handleModalClose = () => {
    if (modal.success) {
      if (redirect) {
        router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
      } else {
        router.push('/login');
      }
    }

    setModal({
      isOpen: false,
      message: '',
      success: false,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      setModal({
        isOpen: true,
        message: '회원가입이 완료되었습니다.',
        success: true,
      });
    },
    onError: (error) => {
      if (error.message === '이미 가입된 이메일입니다.') {
        setErrors((prev) => ({
          ...prev,
          email: [error.message],
        }));
        return;
      }

      setModal({
        isOpen: true,
        message: error.message,
        success: false,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});

    signupMutation.mutate({
      email: formData.email,
      nickname: formData.nickname,
      password: formData.password,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <fieldset disabled={signupMutation.isPending}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              이메일
            </label>
            <Input
              placeholder="이메일을 입력해 주세요"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email[0]}</p>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="nickname" className={styles.label}>
              닉네임
            </label>
            <Input
              placeholder="닉네임을 입력해 주세요"
              id="nickname"
              name="nickname"
              type="text"
              value={formData.nickname}
              onChange={handleChange}
              error={!!errors.nickname}
            />
            {errors.nickname && (
              <p className={styles.errorMessage}>{errors.nickname[0]}</p>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              비밀번호
            </label>
            <PasswordInput
              placeholder="8자 이상 입력해 주세요"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
            />
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password[0]}</p>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="passwordConfirm" className={styles.label}>
              비밀번호 확인
            </label>
            <PasswordInput
              placeholder="비밀번호를 한번 더 입력해 주세요"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              error={!!errors.passwordConfirm}
            />
            {errors.passwordConfirm && (
              <p className={styles.errorMessage}>{errors.passwordConfirm[0]}</p>
            )}
          </div>
          <div className={styles.buttonBox}>
            <PrimaryButton type="submit" className={styles.submitButton}>
              {signupMutation.isPending ? '가입 중...' : '가입하기'}
            </PrimaryButton>
            <GoogleLoginButton />
          </div>
        </fieldset>
      </form>
      <p className={styles.loginLinkText}>
        이미 최애의포토 회원이신가요?
        <Link
          href={
            redirect
              ? `/login?redirect=${encodeURIComponent(redirect)}`
              : '/login'
          }
          className={styles.link}
        >
          로그인하기
        </Link>
      </p>
      <AlertButtonModal
        isOpen={modal.isOpen}
        onClose={handleModalClose}
        btnName="확인"
        onClick={handleModalClose}
      >
        <p>{modal.message}</p>
      </AlertButtonModal>
    </>
  );
};

const SignupForm = () => {
  return (
    <Suspense fallback={<SignupSkeleton />}>
      <SignupFormContent />
    </Suspense>
  );
};

export default SignupForm;
