import { formatNotificationTime } from '@/utils/notificationTime';

const NotificationItem = ({ notification }) => {
  const { message, isRead, createdAt } = notification;

  return (
    <div className="flex gap-4 border-b border-[#333333] px-6 py-5 transition-colors hover:bg-[#222222]">
      <div className="pt-1.5">
        {!isRead && <div className="h-2.5 w-2.5 rounded-full bg-[#FF3B30]" />}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <p className="break-words text-sm leading-6 text-white">{message}</p>

        <span className="text-xs text-[#999999]">
          {formatNotificationTime(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default NotificationItem;
