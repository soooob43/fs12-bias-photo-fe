import Image from 'next/image';
import logoImage from '@/assets/images/img_logo.svg';
import cardImage from '@/assets/images/img_landing_card.webp';
import heroImage from '@/assets/images/img_landing_01.webp';
import tradeImage from '@/assets/images/img_landing_02.webp';
import alarmImage from '@/assets/images/img_landing_03.webp';
import randomBoxImage from '@/assets/images/img_landing_04.webp';
import randomBoxBlue from '@/assets/images/img_landing_box01.webp';
import randomBoxRed from '@/assets/images/img_landing_box02.webp';
import tradeImageMd from '@/assets/images/img_landing_md.webp';
import tradeImageSm from '@/assets/images/img_landing_sm.webp';
import heroBg from '@/assets/images/img_landing_bg.webp';
import Link from 'next/link';
import styles from './landing.module.css';

const Home = () => {
  return (
    <main>
      <section className={`${styles.section} ${styles.heroSection}`}>
        <Image
          src={heroBg}
          alt="bg"
          className={styles.bg}
          sizes="100vw"
          priority
        />
        <div className={styles.hero}>
          <Image src={logoImage} alt="로고" className={styles.logo} />
          <h2 className={styles.heroTitle}>
            구하기 어려웠던
            <br />
            <strong>나의 최애</strong>가 여기에!
          </h2>
          <Link href="/market" className={styles.marketButton}>
            최애 찾으러 가기
          </Link>
          <Image
            src={heroImage}
            alt="hero"
            className={styles.heroImage}
            sizes="100vw"
          />
        </div>
      </section>
      <section className={`${styles.tradeSection} ${styles.tradePhoto}`}>
        <div className={styles.glow} />
        <div className={styles.inner}>
          <div className={styles.titleBox}>
            <h2 className={styles.title}>
              포인트로 <strong>안전하게 거래</strong>하세요
            </h2>
            <p className={styles.description}>
              내 포토카드를 포인트로 팔고, 원하는 포토카드를
              <br />
              포인트로 안전하게 교환하세요
            </p>
          </div>
          <Image
            src={tradeImage}
            alt="trade"
            className={styles.tradeImagePC}
            sizes="100vw"
          />
          <Image
            src={tradeImageMd}
            alt="trade"
            className={styles.tradeImageMd}
          />
          <div className={styles.flexBox}>
            <Image
              src={tradeImageSm}
              alt="trade"
              className={styles.tradeImageSm}
              sizes="100vw"
            />
          </div>
        </div>
      </section>
      <section className={styles.tradeSection}>
        <div className={styles.blueGlow}></div>
        <div className={styles.inner}>
          <div className={styles.titleBox}>
            <h2 className={styles.title}>
              알림으로 보다
              <strong className={styles.tradeTitle}>빨라진 거래</strong>
            </h2>
            <p className={styles.description}>
              교환 제안부터 판매 완료까지,
              <br />
              실시간 알림으로 놓치지 마세요
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src={alarmImage}
              alt="alarm"
              className={styles.alarmImage}
              sizes="100vw"
            />
            <div className={styles.blueBubble}>제 포카랑 교환해요 ✌🏻</div>
            <div className={styles.grayBubble}>
              [스페인 여행] 포카 사고 싶어요! ⛰
            </div>
          </div>
        </div>
      </section>
      <section className={styles.randomBoxSection}>
        <div className={styles.randomBg} />
        <Image
          src={randomBoxBlue}
          alt="파란랜덤박스"
          className={styles.giftLeft}
        />
        <Image
          src={randomBoxRed}
          alt="빨간랜덤박스"
          className={styles.giftRight}
        />
        <div className={styles.inner}>
          <div className={styles.titleBox}>
            <h2 className={styles.title}>
              랜덤 상자로 <strong>포인트 받자!</strong> 🎉
            </h2>
            <p className={styles.description}>
              한 시간마다 주어지는 랜덤 상자를 열고,
              <br />
              포인트를 획득하세요
            </p>
          </div>
          <Image
            src={randomBoxImage}
            className={styles.randomeBox}
            alt="randomeBox"
            sizes="100vw"
          />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.cardinner}>
          <Image src={cardImage} alt="카드" className={styles.cardImage} />
          <h2 className={styles.cardTitle}>나의 최애를 지금 찾아보세요!</h2>
          <Link href="/market" className={styles.marketButton}>
            최애 찾으러 가기
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
