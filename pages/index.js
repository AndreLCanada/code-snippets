import React, {useEffect, useState, createContext, useContext} from 'react'
import Head from 'next/head'
import Airtable from 'airtable';
import EditorRenderedHome from '../components/Editor';
import homeStyles from '../styles/Home.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ReactDOM from "react-dom/client";

const UserContext = createContext()
 

export default function Home({ articles }) {
  const [toggle, setToggle] = useState(0);
  const [typeOfCode, setTypeOfCode] = useState(2)
  const [indexOfCode, setIndexOfCode] = useState(1) 

 
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
    indexOfCode < articles.length - 1 && setIndexOfCode(indexOfCode + 1);
  }

  const handleBackwardClick = () => {
    indexOfCode > 0 && setIndexOfCode(indexOfCode - 1);
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
          <a clasName={homeStyles.btn_shine} target="_blank">codeSnippets: <br></br>{articles ? articles.length : null}</a>
        </div>
        <script>{console.log(articles)}</script>
        <div className={homeStyles.div_two}>
          <div className={homeStyles.dropdown}>
            <button className={homeStyles.dropdown}>New Snippet</button>
            <div className={homeStyles.dropdown_content}>
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
          <a className={homeStyles.title} >{articles[indexOfCode].Title}</a>
          <a className={homeStyles.description}> {articles[indexOfCode].description}</a>
          </div>
          <ArrowForwardIosIcon onClick={handleForwardClick} sx={{ fill: !'inherit', fontSize: "4vw",}}/>
      </div>
    </div>
    </div>
  
  );
  
};


export async function getServerSideProps() {
  const airtable = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_DB_KEY,
  });

  const records = await airtable
    .base(process.env.NEXT_PUBLIC_DB_BASE)('code')
    .select({
      fields: ['Title', 'details', 'description', 'type'],
    }).all();

  const articles = records.map((product) => {
    return {
      Title: product.get('Title') || null,
      details: product.get('details') || null,
      description: product.get('description') || null,
      type: product.get('type') || null,
    };
  });

  return {
    props: {
      articles,
    },
  };
}

