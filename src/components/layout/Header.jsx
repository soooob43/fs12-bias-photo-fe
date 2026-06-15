'use client';
import Image from 'next/image';
import Link from 'next/link';
import { brBold } from '@/fonts';
import logo from '@/assets/images/img_logo.svg';
import menu from '@/assets/icons/ic_menu.svg';
import notificationIcon from '@/assets/icons/ic_notification.svg';

const Header = () => {
  const { data: user } = useMe();
  return (
    <header>
      <Image
        src={logo}
        alt="logo"
        width={139}
        height={25}
        className="
        w-[83px]
        sm:w-[111px]
        md:w-[139px]
        h-auto
        "
      />
      {user ? (
        <nav>
          <p>{user?.points} P</p>
          <button>
            <Image
              src={notificationIcon}
              alt="notification"
              width={24}
              height={24}
            ></Image>
          </button>
          <p className={`${brBold.className}`}>{user?.nickname}</p>
          <button>로그아웃</button>
          <button>
            <Image src={menu}></Image>
          </button>
        </nav>
      ) : (
        <nav>
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
