import { authHeaderFetch } from './core/fetchClient';

export const getNotifications = async ({
  cursor = null,
  limit = 20,
}) => {
  const searchParams = new URLSearchParams();

  if (cursor) {
    searchParams.set('cursor', cursor);
  }

  searchParams.set('limit', limit);

  const queryString = searchParams.toString();

  return authHeaderFetch(
    `/notifications${queryString ? `?${queryString}` : ''}`,
  );
};

export const getUnreadNotificationCount = async () => {
  return authHeaderFetch('/notifications/unread-count');
};

export const readNotification = async (notificationId) => {
  return authHeaderFetch(`/notifications/${notificationId}/read`, {
    method: 'PATCH',
  });
};

export const readAllNotifications = async (notificationIds) => {
  return authHeaderFetch('/notifications/read', {
    method: 'PATCH',
    body: JSON.stringify({
      notificationIds,
    }),
  });
};