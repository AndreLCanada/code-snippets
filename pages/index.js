import React from 'react'
import Head from 'next/head'
import { server } from '../config'
import ArticleList from '../components/ArticleList';
import Airtable from 'airtable';
import EditorExample from '../components/Editor';




export default function Home({ articles }) {
  const [postBody, setPostBody] = React.useState("");
  return (
    <div >
    <Head>
       <title>Welcome</title>
       <meta name="keywords" content="web development, programming" />
    </Head>
     <div className="editor">
       <EditorExample />
    </div> 
 <div>

  </div>
     {console.log(articles)}
    </div>
  );
};


 export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/articles`)
  const articles = await res.json()

    return {
      props: {
        articles,
      },
    }
} 

/* export const getStaticProps = async () => {


  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=8`)
  const articles = await res.json()

    return {
      props: {
        articles,
      },
    }
} */
