import NotificationHeader from '@/components/Notification/NotificationHeader';
import NotificationList from '@/components/Notification/NotificationList';

const NotificationsPage = () => {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1100px] bg-black">
      <NotificationHeader />

      <NotificationList />
    </main>
  );
};

export default NotificationsPage;
