import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postDirectory = path.join(process.cwd(), '/pages/posts/md');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // read markdown file as string
    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    //console.log(matterResult.content); 
    const contents = matterResult.content;
    // combine the data with the id
    return {
      id,
      contents,
      ...matterResult.data,
    };
  });
  // Sort posts by data
  //console.log(contents);
  return allPostsData.sort((a,b) => {
    if(a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// new dynamic roots
export async function getAllPostIds() {
  // file system version.
  // remove async and await if you use file system even getStaticPaths() in [id].js too.
  /* const fileNames = fs.readdirSync(postDirectory);
  console.log(fileNames);

  return fileNames.map((fileItem) => {
    return {
      params: {
        id: fileItem.replace(/\.md$/, '')
      }
    }
  }) */

  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('https://www.jswjake.space/tutorial/t2/api/nextmd_mockup');
  const posts = await res.json();
  return posts.map((dta) => {
    return {
      params: {
        id: dta,
      },
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const contents = matterResult.content;


  // use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(contents);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    contents,
    contentHtml,
    ...matterResult.data,
  };
}
// new dynamic roots
