import React, {useState} from 'react'
import snippetStyles from '../../styles/Snippet.module.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditorRenderedSnippets from '../../components/EditorSnippets';
import Airtable from 'airtable';

export const base = new Airtable({apiKey: process.env.NEXT_PUBLIC_DB_KEY }).base( process.env.NEXT_PUBLIC_DB_BASE );

const gallery = ({articles}) => {

  const [indexOfCode, setIndexOfCode] = useState(1) 

  const handleForwardClick = () => {
    indexOfCode < articles.length - 1 && setIndexOfCode(indexOfCode + 1);
  
  }

  const handleBackwardClick = () => {
    indexOfCode > 0 && setIndexOfCode(indexOfCode - 1);
  }

  return (
    <div className={snippetStyles.div_three}>
        
          <ArrowBackIosIcon onClick={handleBackwardClick} sx={{ fill: !'inherit', fontSize: "4vw",}}/>
        <div className={snippetStyles.editor}>
          <EditorRenderedSnippets articles={articles} indexOfCode={indexOfCode}/>
        </div>
          <div className={snippetStyles.info_container}>
          <a className={snippetStyles.title} >{articles[indexOfCode].Title}</a>
          <a className={snippetStyles.description} >{articles[indexOfCode].description}</a>
          </div>
          <ArrowForwardIosIcon onClick={handleForwardClick} sx={{ fill: !'inherit', fontSize: "4vw",}}/>
      
    </div>
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

  return {
    props: {
      articles,
    },
  };
}