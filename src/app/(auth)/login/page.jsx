// TestLogin.jsx

'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 환경변수에 설정된 API 주소를 사용합니다. (없으면 기본 로컬 주소)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
const TestLogin = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 1. 페이지 접속 시 기존 로그인 여부(토큰 유무) 확인
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // 2. 로그인 처리 핸들러
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 복잡한 fetchClient 대신 브라우저 기본 fetch로 직관적으로 작성
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || '로그인에 실패했습니다.');
      }

      // 💡 핵심: 발급받은 토큰을 localStorage에 저장해야
      // 이후 authHeaderFetch에서 자동으로 헤더에 담아서 보냅니다.
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }

      setIsLoggedIn(true);
      alert('로그인 성공! 이제 카드를 생성할 수 있습니다.');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. 로그아웃 처리 핸들러
  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // 토큰 삭제
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    alert('로그아웃 되었습니다.');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
          🔑 테스트 로그인
        </h1>

        {isLoggedIn ? (
          // 로그인 완료 상태 화면
          <div className="flex flex-col gap-4 text-center mt-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl mb-4">
              <p className="text-green-700 font-semibold">
                ✅ 현재 로그인되어 있습니다.
              </p>
            </div>

            <button
              onClick={() => router.push('/test-create')}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition"
            >
              포토카드 생성 테스트 하러가기 👉
            </button>

            <button
              onClick={handleLogout}
              className="w-full py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition mt-2"
            >
              로그아웃
            </button>
          </div>
        ) : (
          // 로그인 폼 화면
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="가입된 이메일을 입력하세요"
                className="p-4 text-gray-900 border border-gray-300 rounded-xl outline-none focus:border-gray-900 transition"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="p-4 text-gray-900 border border-gray-300 rounded-xl outline-none focus:border-gray-900 transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-4 bg-gray-900 text-white font-bold rounded-xl text-lg hover:bg-gray-800 disabled:bg-gray-400 transition"
            >
              {isLoading ? '로그인 진행 중...' : '로그인'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TestLogin;
