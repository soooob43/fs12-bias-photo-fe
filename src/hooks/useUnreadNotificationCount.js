import { useQuery } from '@tanstack/react-query';
import { getUnreadNotificationCount } from '@/api/notificationApi';

export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: async () => {
      const data = await getUnreadNotificationCount();
      return data.unreadCount;
    },
  });
};