import React, {useState, useRef, useEffect} from 'react'
import snippetStyles from '../../styles/Snippet.module.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditorRenderedSnippets from '../../components/EditorSnippets';
import Airtable from 'airtable';
import SearchIcon from '@mui/icons-material/Search';
import { ConstructionOutlined } from '@mui/icons-material';

export const base = new Airtable({apiKey: process.env.NEXT_PUBLIC_DB_KEY }).base( process.env.NEXT_PUBLIC_DB_BASE );

const gallery = ({articles}) => {
  const [codeArray, setCodeArray] = useState(articles)
  const [indexOfCode, setIndexOfCode] = useState(1) 
  let codeArrayLength = codeArray.length - 1;
  const handleForwardClick = () => {
    indexOfCode < codeArrayLength && setIndexOfCode(indexOfCode + 1);
  }

  const handleBackwardClick = () => {
    indexOfCode > 0 && setIndexOfCode(indexOfCode - 1);
  }

  const handleSearchChange = (e) => {
   e.nativeEvent.srcElement.value 
    ? setCodeArray(articles.filter(snippet => snippet.Title.includes(e.nativeEvent.srcElement.value) || snippet.description.includes(e.nativeEvent.srcElement.value)))
    : setCodeArray(articles)
  }

  
  
  return (
    <>
    <div className={snippetStyles.searchContainer}>
      <SearchIcon sx={{ fill: !'inherit', fontSize: "1.3rem", position: "relative", zIndex: 3, transform: "translateX(26px) translateY(5px)", }}/>
      <input className={snippetStyles.input} type="text" rows="1"  id="title" onChange={handleSearchChange}></input>
    </div>
    <div className={snippetStyles.div_three}>
        
          <ArrowBackIosIcon onClick={handleBackwardClick} sx={{ fill: !'inherit', fontSize: "6vw",}}/>
        <div className={snippetStyles.editor}>
          <EditorRenderedSnippets articles={codeArray} indexOfCode={indexOfCode}/>
        </div>
          <div className={snippetStyles.info_container}>
          <a className={snippetStyles.title} >{articles[indexOfCode].Title}</a>
          <a className={snippetStyles.description} >{articles[indexOfCode].description}</a>
          </div>
          <ArrowForwardIosIcon onClick={handleForwardClick} sx={{ fill: !'inherit', fontSize: "6vw",}}/>
      
    </div>
    </>
  )
}

export default gallery


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
    const arrayLength = articles.length - 1;
  return {
    props: {
      articles,
      arrayLength,
    },
  };
}