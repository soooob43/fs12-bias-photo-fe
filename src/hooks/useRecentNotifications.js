import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '@/api/notificationApi';

export const useRecentNotifications = () => {
  return useQuery({
    queryKey: ['notifications', 'recent'],

    queryFn: async () => {
      const data = await getNotifications({
        limit: 5,
      });
      // console.log('알림 API 응답', data);
      return data.data;
    },
  });
};
