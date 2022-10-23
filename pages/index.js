import React from 'react'
import Head from 'next/head'
import { server } from '../config'
import ArticleList from '../components/ArticleList';
import Airtable from 'airtable';
import EditorRendered from '../components/Editor';




export default function Home({ articles }) {
  const [postBody, setPostBody] = React.useState("");
  return (
    <div >
    <Head>
       <title>codeSnippets</title>
       <meta name="keywords" content="web development, programming" />
    </Head>
     <div className="editor">
       home
    </div> 
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
