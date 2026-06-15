'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import Input from '@/components/ui/Input/Input';
import PasswordInput from '@/components/ui/Input/PasswordInput';
import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '@/api/authApi';
import AlertModal from '@/components/ui/AlertModal/AlertModal';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './LoginForm.module.css';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';

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

  const queryClient = useQueryClient();

  const [errors, setErrors] = useState({});

  const [modal, setModal] = useState({
    isOpen: false,
    message: '',
  });

  const handleModalClose = () => {
    setModal({
      isOpen: false,
      message: '',
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

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['me'],
      });

      router.push(redirect || '/market');
    },
    onError: (error) => {
      setModal({
        isOpen: true,
        message: error.message,
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

    loginMutation.mutate({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <Suspense>
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
            placeholder="비밀번호를 입력해 주세요"
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

        <div className={styles.buttonBox}>
          <PrimaryButton
            type="submit"
            disabled={loginMutation.isPending}
            className={styles.submitButton}
          >
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </PrimaryButton>
          <GoogleLoginButton />
        </div>
      </form>
      <p className={styles.signupLinkText}>
        최애의 포토가 처음이신가요?
        <Link
          href={
            redirect
              ? `/signup?redirect=${encodeURIComponent(redirect)}`
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
    </Suspense>
  );
};

export default LoginForm;
