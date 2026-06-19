import { useQuery } from '@tanstack/react-query';
import { getUnreadNotificationCount } from '@/api/notificationApi';
import { useMe } from './useMe';

export const useUnreadNotificationCount = (isLoggedIn) => {
  return useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: async () => {
      const data = await getUnreadNotificationCount();
      return data.unreadCount;
    },
    enabled: !!isLoggedIn,
  });
};
