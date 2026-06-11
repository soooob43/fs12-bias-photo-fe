'use client';

import { useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import Input from '@/components/ui/Input/Input';
import PasswordInput from '@/components/ui/Input/PasswordInput';
import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import { useMutation } from '@tanstack/react-query';
import { signup } from '@/api/authApi';
import AlertModal from '@/components/ui/AlertModal/AlertModal';
import { useRouter, useSearchParams } from 'next/navigation';

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, '이메일을 입력해주세요.')
    .email('이메일 형식이 올바르지 않습니다.'),
  password: z.string().trim().nonempty('비밀번호를 입력해주세요.'),
});

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get('redirect');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      router.push(redirect || '/market');
    },
    onError: (error) => {
      if (error.message === '이미 사용 중인 이메일입니다.') {
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

    const result = loginSchema.safeParse(formData);

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

        <PrimaryButton
          type="submit"
          disabled={signupMutation.isPending}
          className={styles.submitButton}
        >
          {signupMutation.isPending ? '가입 중...' : '가입하기'}
        </PrimaryButton>
      </form>
      <p className={styles.loginLinkText}>
        최애의 포토가 처음이신가요?
        <Link
          href={
            redirect
              ? `/signupredirect=${encodeURIComponent(redirect)}`
              : '/signup'
          }
          className={styles.link}
        >
          회원가입하기
        </Link>
      </p>
      <AlertModal isOpen={modal.isOpen} onClose={handleModalClose}>
        <p>{modal.message}</p>
      </AlertModal>
    </>
  );
};

export default LoginForm;
