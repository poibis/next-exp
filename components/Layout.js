import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Your name';
export const siteTitle = "next.js sample website";

export default function Layout ( {children, home} ) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using next.js"
        />
        <meta property="og:image" content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`} ></meta>
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              width={144}
              height={144}
              alt="profile"
            />
            <h1 className={utilStyles.heading2x1}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/cream_cut.png"
                className={utilStyles.borderCircle}
                width={108}
                height={108}
                alt=""
                />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/home">back to home</Link>
        </div>
      )}
    </div>
  );
  // return <div className={styles.container}>{children}</div>;
}