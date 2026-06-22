import NotificationHeader from '@/components/notification/NotificationHeader';
import NotificationList from '@/components/notification/NotificationList';

const NotificationsPage = () => {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1100px] bg-black">
      <NotificationHeader />

      <NotificationList />
    </main>
  );
};

export default NotificationsPage;
