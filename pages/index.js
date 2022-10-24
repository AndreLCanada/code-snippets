import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import { server } from '../config'
import ArticleList from '../components/ArticleList';
import Airtable from 'airtable';
import EditorRenderedHome from '../components/Editor';
import homeStyles from '../styles/Home.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export default function Home({ articles }) {
  const [postBody, setPostBody] = useState("");
  const [typeOfCode, setTypeOfCode] = useState(2)
  const [indexOfCode, setIndexOfCode] = useState(3)


  const handleComponentClick = () => {
      setTypeOfCode(2);
  }

  const handleFunctionClick = () => {
    setTypeOfCode(0);
  }

  const handleClassClick = () => {
    setTypeOfCode(1);
  }

  const handleForwardClick = () => {
    setIndexOfCode((currentIndex) => currentIndex + 1);
    console.log(indexOfCode)
  }

  const handleBackwardClick = () => {
    setIndexOfCode((currentIndex) => currentIndex - 1);
  }

  

  return (
    <div>
    <Head>
       <title>codeSnippets</title>
       <meta name="keywords" content="web development, programming" />
    </Head>
    <div className={homeStyles.container}>
      <div className={homeStyles.div_container}>
        <div className={homeStyles.div_one}>
        <a class={homeStyles.btn_shine} target="_blank">codeSnippets: <br></br>{articles.length}</a>
        </div>
        <div className={homeStyles.div_two}>
        <div class={homeStyles.dropdown}>
          <button class={homeStyles.dropdown}>New Snippet</button>
          <div class={homeStyles.dropdown_content}>
          <a onClick={handleComponentClick} >Component</a>
          <a onClick={handleFunctionClick}  >Function</a>
          <a onClick={handleClassClick}  >Class</a>
          </div>
        </div>
        </div>
      </div>
      <div className={homeStyles.div_three}>
          <ArrowBackIosIcon onClick={handleBackwardClick} sx={{ fill: !'inherit', fontSize: "4vw",}}/>
        <div className={homeStyles.editor}>
          <EditorRenderedHome indexOfCode={indexOfCode} articles={articles} />
        </div>
          <div className={homeStyles.info_container}>
          <a className={homeStyles.title} >{articles[4].fields.Title}</a>
          <a className={homeStyles.description} >{articles[4].fields.description}</a>
          </div>
          <ArrowForwardIosIcon onClick={handleForwardClick} sx={{ fill: !'inherit', fontSize: "4vw",}}/>
      </div>
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
