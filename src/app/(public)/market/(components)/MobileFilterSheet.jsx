'use client';

import { useState } from 'react';
import { Overlay } from '@/components/ui/Overlay';
import CloseIcon from '@/components/icons/CloseIcon';
import RefreshIcon from '@/components/icons/RefreshIcon';
import { useQuery } from '@tanstack/react-query';
import { fetchTransactionsFilterMeta } from '@/api/marketApi';
import {
  FILTER_KEY_MAP,
  FILTER_CONFIG,
  GRADE_TEXT_COLOR,
} from '@/constants/filter';

export const MobileFilterSheet = ({
  tabs,
  initialSelection,
  onClose,
  onLookup,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { data: filterMetaData } = useQuery({
    queryKey: ['transactionsFilterMeta'],
    queryFn: fetchTransactionsFilterMeta,
    staleTime: 1000 * 60 * 3, // 3분 동안 캐시 유지
  });

  // API 응답 데이터 추출
  const counts = filterMetaData?.data?.counts || {};
  const totalPhotos = filterMetaData?.data?.totalPhotos || 0;

  const [currentSelection, setCurrentSelection] = useState(
    initialSelection ||
      tabs.reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
  );

  const activeConfig = FILTER_CONFIG[activeTab];

  const selectOption = (option) => {
    setCurrentSelection((prev) => {
      const resetState = tabs.reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {});

      resetState[activeTab] = prev[activeTab] === option ? null : option;

      return resetState;
    });
  };

  // 현재 활성 탭에서 해당 옵션이 선택됐는지 확인
  const isSelected = (option) => {
    return currentSelection[activeTab] === option;
  };

  // 모든 탭의 선택값 초기화
  const resetFilter = () => {
    setCurrentSelection(
      tabs.reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
    );
  };

  // 확인 버튼 클릭 시 선택값을 부모로 전달하고 닫기
  const handleLookup = () => {
    onLookup?.(currentSelection);
    onClose();
  };

  const selectedTab = tabs.find((key) => currentSelection[key] !== null);
  const selectedOption = selectedTab ? currentSelection[selectedTab] : null;

  let selectedCount = 0;
  if (selectedTab && selectedOption) {
    const backendKey = FILTER_KEY_MAP[selectedTab]?.[selectedOption];
    selectedCount = counts?.[selectedTab]?.[backendKey] ?? 0;
  }

  return (
    <Overlay onClose={onClose} align="end">
      <div className="bg-(--bg-bg) relative flex min-h-[30rem] max-h-[50vh] w-full flex-col rounded-t-[1.25rem]">
        {/* 헤더 */}
        <div className="flex justify-center py-4 shrink-0">
          <h2 className="text-[16px] text-(--gray-gray400)">필터</h2>
          <button
            onClick={onClose}
            aria-label="모달 닫기"
            className="group absolute top-[0.88rem] right-[0.9375rem] flex h-6 w-6 items-center justify-center"
          >
            <CloseIcon
              className={
                'group-hover:text-(--white-white) text-(--gray-gray400) transition-colors duration-150'
              }
            />
          </button>
        </div>

        {/* 탭: 선택된 탭은 흰색 글씨와 하단 border 표시 */}
        <ul className="flex gap-6 border-b border-(--gray-gray500) px-6 shrink-0">
          {tabs.map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`text-[16px] p-4 transition-colors duration-150 ${
                  activeTab === tab
                    ? 'border-b-[1.5px] border-white text-white'
                    : 'text-(--gray-gray400) hover:text-(--gray-gray300)'
                }`}
              >
                {FILTER_CONFIG[tab].label}
              </button>
            </li>
          ))}
        </ul>

        {/* 옵션 목록 */}
        <ul className="mt-[1.19rem] flex flex-1 flex-col gap-[0.19rem] overflow-y-auto overscroll-contain pb-4">
          {activeConfig.options.map((option) => {
            // 한글 UI 옵션을 백엔드의 영문 키로 변환하여 개수 추출
            const backendKey = FILTER_KEY_MAP[activeTab]?.[option];
            const optionCount = counts?.[activeTab]?.[backendKey];

            return (
              <li key={option}>
                <button
                  onClick={() => selectOption(option)}
                  className={`text-[14px] flex shrink-0 w-full items-center justify-between px-8 py-4 text-left transition-colors duration-150 ${
                    isSelected(option)
                      ? 'bg-(--gray-gray500)'
                      : 'hover:bg-(--gray-gray500)'
                  }`}
                >
                  <span
                    className={
                      activeTab === 'grade'
                        ? GRADE_TEXT_COLOR[option]
                        : isSelected(option)
                          ? 'text-(--white-white)'
                          : 'text-(--gray-gray300) hover:text-(--gray-gray200)'
                    }
                  >
                    {option}
                  </span>

                  {optionCount !== undefined && (
                    <span
                      className={
                        isSelected(option)
                          ? 'text-(--white-white)'
                          : 'text-(--gray-gray300)'
                      }
                    >
                      {optionCount}개
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <footer className="flex w-full shrink-0 gap-2 px-[18px] pb-[2.5rem]">
          {/* 필터 초기화 버튼 */}
          <button onClick={resetFilter} className="group  p-[0.94rem]">
            <RefreshIcon className="text-(--gray-gray400) transition-colors duration-150 group-hover:text-(--white-white)" />
          </button>

          {/* 필터 조회하기 버튼 */}
          <button
            onClick={handleLookup}
            className="w-full max-h-[55px] py-[17px] bg-(--main-main) text-(--black-black) font-semibold text-[16px] rounded-[2px] cursor-pointer lg:text-[18px] hover:bg-[#b8c41a]"
          >
            {selectedTab
              ? `${selectedCount}개 포토 보기`
              : `${totalPhotos}개 포토 보기`}
          </button>
        </footer>
      </div>
    </Overlay>
  );
};
