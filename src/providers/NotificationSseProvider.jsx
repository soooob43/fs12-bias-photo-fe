'use client';

import { useMe } from '@/hooks/useMe';
import { useNotificationSse } from '@/hooks/useNotificationSse';

const NotificationSseProvider = ({ children }) => {
  const { data: user } = useMe();
  useNotificationSse(!!user);

  return <>{children}</>;
};

export default NotificationSseProvider;
