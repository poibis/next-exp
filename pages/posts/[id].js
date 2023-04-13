import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyle from '../../styles/utils.module.css';

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <br/>
            <br/>

            <article>
                <h1 className={utilStyle.headingX1}>{postData.title}</h1>
                <div className={utilStyle.lightText}>
                    <Date dateString={postData.date}/>
                </div>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
            </article>
            <br/>
            {postData.id}
            <br/>
            {/* {postData.contents} */}

        </Layout>
    )
}
export async function getStaticPaths() {
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: false,
    }
    // Return a list of possible value for id
}

export async function getStaticProps({ params }) {

    //console.log(params);
    // Fetch nessary data for the blog post using params.id
    const postData = await getPostData(params.id);
    /* const postDataContent = getPostData(params.contents); */
    // console.log(postData);
    return {
        props: {
            postData,
        },
    };
}