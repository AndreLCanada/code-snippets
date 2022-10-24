import React from 'react'
import snippetStyles from '../../styles/Snippet.module.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditorRenderedSnippets from './components/Editor';
import Airtable from 'airtable';

export const base = new Airtable({apiKey: process.env.NEXT_PUBLIC_DB_KEY }).base( process.env.NEXT_PUBLIC_DB_BASE );

const gallery = ({articles}) => {
  return (
    <div className={snippetStyles.div_three}>
        
          <ArrowBackIosIcon sx={{ fill: !'inherit', fontSize: "4vw",}}/>
        <div className={snippetStyles.editor}>
          <EditorRenderedSnippets articles={articles} />
        </div>
          <div className={snippetStyles.info_container}>
          <a className={snippetStyles.title} >{articles[4].Title}</a>
          <a className={snippetStyles.description} >{articles[4].description}</a>
          </div>
          <ArrowForwardIosIcon sx={{ fill: !'inherit', fontSize: "4vw",}}/>
      
    </div>
  )
}

export default gallery


export async function getStaticProps() {
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