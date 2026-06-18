export const formatNotificationTime = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);

  const diffMs = now - createdDate;

  const hour = 1000 * 60 * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diffMs < hour) {
    return '방금 전';
  }

  if (diffMs < day) {
    return `${Math.floor(diffMs / hour)}시간 전`;
  }

  if (diffMs < week) {
    return `${Math.floor(diffMs / day)}일 전`;
  }

  if (diffMs < month) {
    return `${Math.floor(diffMs / week)}주 전`;
  }

  if (diffMs < year) {
    return `${Math.floor(diffMs / month)}개월 전`;
  }

  return `${Math.floor(diffMs / year)}년 전`;
};