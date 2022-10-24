import React, {useEffect, useState} from 'react'
import Head from 'next/head'
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
          <a class={homeStyles.btn_shine} target="_blank">codeSnippets: <br></br>{articles ? articles.length : null}</a>
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
          { articles ? <EditorRenderedHome indexOfCode={indexOfCode} articles={articles} /> : null}
        </div>
          <div className={homeStyles.info_container}>
          <a className={homeStyles.title} >{articles ? articles[4].Title : null}</a>
          <a className={homeStyles.description} >{articles ? articles[4].description : null}</a>
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
    })
    .all();

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