'use client';

import { useNotificationSse } from '@/hooks/useNotificationSse';

const NotificationSseProvider = () => {
  useNotificationSse();

  return null;
};

export default NotificationSseProvider;
