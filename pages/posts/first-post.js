import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';

export default function FirstPost() {
  return (
    <>
    <Layout>
      <Head>
        <title>First post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">← Back to home</Link>
      </h2>
    </Layout>
    <Script
      src="https://connect.facebook.net/en_US/sdk.js"
      strategy="lazyOnload"
      onLoad={()=> {
        console.log('test');
        console.log('test2');
      }}
    />
    <div>
      <h1 className="title">
        Welcome to <a href="https://nextjs.org">Next.js !</a>
      </h1>
      <h3 className="title">
        Read <Link href="/posts/first-post" as="/">this page!</Link>
      </h3>
      <h2>First Post</h2>
      <img src="/images/profile.jpg" alt="Your Name" />
      <Image
        src="/images/profile.jpg"
        width={144}
        height={144}
        alt="resize Your Name"
      />
    </div>
    </>
  );
}