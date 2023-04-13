import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout';
import Alert from '../components/alert.js';
import utilStyle from '../styles/utils.module.css';

import { getSortedPostsData } from '../lib/posts';
import useSWR from 'swr';

import Link from 'next/link'
import Date from '../components/date'


const fetcher = url => fetch(url).then(r => r.json());

export async function getStaticProps() {

  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

function Dpv(props) {
  const ppv = props.origindata;
  console.log(ppv);
  return (
    <div>test</div>
  )

}
function Profile() {
  const { data, error, isLoading } = useSWR("https://www.jswjake.space/tutorial/t2/api/think_mockup", fetcher);

  const dta = new Array();
  if(error) return <div>fail to load</div>
  if(isLoading) return <div>Now Loading...</div>

  data.map((item, index) => {
    /* console.log(JSON.stringify(item) + '\n******');
    console.log(item.category);
    console.log(index); */
    dta.push(item);
  })
  return  (
    <div>
      {dta.map( (item, index) => {
        return ( <div key={index} className={item.SEQ_NO}>{item.category}</div> )
      } )}
    </div>
  );
}

export default function Home( {allPostsData} ) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>self name check</p>
        <p>
          (this is a sample website - you'll be building a site like this)<br/>
          <a href="/posts/first-post">To go first-post</a>
        </p>
      </section>
      <Alert type="success">
        test1<br/>
        Test2<br/>
        test3231
      </Alert>

      <hr/>
      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2 className={utilStyle.headingLg}>Blog</h2>
        <ul className={utilStyle.list}>
          {/* {allPostsData.map( ({id, date, title, tt2, contents}) => (
            <li className={utilStyle.listItem} key={id}>
              {title}
              <br/>
              {id}
              <br/>
              {date}
              <br/>
              {tt2}
              <br/>
              {contents}
            </li>
          ))} */}

          {allPostsData.map( ({id, date, title, tt2, contents}) => (
            <li className={utilStyle.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br/>
              <small className={utilStyle.lightText}>
                <Date dateString={date} />
              </small>
              <br/>
              {tt2}
              <br/>
              {contents}
            </li>
          ))}
        </ul>
      </section>
      <Profile></Profile>
    </Layout>
  );
}