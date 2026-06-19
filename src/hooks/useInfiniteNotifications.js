import { useInfiniteQuery } from '@tanstack/react-query';
import { getNotifications } from '@/api/notificationApi';

export const useInfiniteNotifications = () => {
  return useInfiniteQuery({
    queryKey: ['notifications', 'infinite'],

    queryFn: async ({ pageParam = null }) => {
      return getNotifications({
        cursor: pageParam,
        limit: 20,
      });
    },

    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor || undefined;
    },

    initialPageParam: null,
  });
};