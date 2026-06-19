'use client';

import { useNotificationSse } from '@/hooks/useNotificationSse';

const NotificationSseProvider = ({ children }) => {
  useNotificationSse();

  return <>{children}</>;
};

export default NotificationSseProvider;
