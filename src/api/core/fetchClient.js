const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// URL 경로 결합 함수
export const createUrl = (url) => {
  if (!BASE_URL) {
    throw new Error(
      'NEXT_PUBLIC_API_URL이 설정되지 않았습니다. .env.local을 확인해 주세요.',
    );
  }

  const path = url.startsWith('/') ? url : `/${url}`;
  return `${BASE_URL}${path}`;
};

/*-----------------------------------------------------
   기본 fetch 클라이언트 - 인증이 필요 없는 일반 요청용
 -----------------------------------------------------*/
export const defaultFetch = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const res = await fetch(createUrl(url), mergedOptions);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${res.status}`);
  }

  return res.json();
};

/*-----------------------------------------
        쿠키 인증 fetch 클라이언트
 ------------------------------------------*/
export const cookieFetch = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    cache: 'no-store',
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // 원래 요청 실행
  let res = await fetch(createUrl(url), mergedOptions);

  // 401 에러 발생 시 토큰 갱신 시도
  if (res.status === 401 && !url.includes('/auth/refresh')) {
    try {
      // 토큰 갱신 요청
      const refreshResponse = await fetch(createUrl('/auth/refresh'), {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
      });

      if (refreshResponse.ok) {
        // 토큰 갱신 성공 시 원래 요청 재시도
        res = await fetch(createUrl(url), mergedOptions);
      }
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${res.status}`);
  }

  if (res.status === 204) return {};

  // 응답 본문이 있는지 확인
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }

  // 본문이 없거나 JSON이 아닌 경우 응답 객체 자체 반환
  return { status: res.status, ok: res.ok };
};

/*-----------------------------------------------------
       Authorization-Header 인증 fetch 클라이언트
 -----------------------------------------------------*/
export const authHeaderFetch = async (url, options = {}) => {
  const isClient = typeof window !== 'undefined';
  const accessToken = isClient ? localStorage.getItem('accessToken') : null;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    cache: 'no-store',
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // 원래 요청 실행
  let res = await fetch(createUrl(url), mergedOptions);

  // 401 에러 발생 시 토큰 갱신 시도
  if (res.status === 401 && !url.includes('/auth/refresh') && isClient) {
    try {
      // 토큰 갱신 요청
      const refreshResponse = await fetch(createUrl('/auth/refresh'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        localStorage.setItem('accessToken', data.accessToken);
        mergedOptions.headers.Authorization = `Bearer ${data.accessToken}`;
        // 토큰 갱신 성공 시 원래 요청 재시도
        res = await fetch(createUrl(url), mergedOptions);
      } else {
        // 리프레시 토큰까지 만료된 경우 로그아웃 처리
        localStorage.removeItem('accessToken');
        throw new Error('Unauthorized'); // 메인 페이지로 튕겨내기
      }
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
      throw error;
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${res.status}`);
  }

  if (res.status === 204) return {};

  // 응답 본문이 있는지 확인
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }

  // 본문이 없거나 JSON이 아닌 경우 응답 객체 자체 반환
  return { status: res.status, ok: res.ok };
};

/*-----------------------------------------------------
   로그인/회원가입 등 토큰을 발급받을 때 사용하는 fetch
 -----------------------------------------------------*/
export const authFetch = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    cache: 'no-store',
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const res = await fetch(createUrl(url), mergedOptions);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${res.status}`);
  }

  const data = await res.json();

  if (typeof window !== 'undefined') {
    if (data.accessToken) localStorage.setItem('accessToken', data.accessToken);
  }

  return {
    status: res.status,
    data,
  };
};
