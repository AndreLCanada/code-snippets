import React from 'react'
import snippetStyles from '../../styles/Snippet.module.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditorRenderedSnippets from './components/Editor';
import { server } from '../../config';
const gallery = ({articles}) => {
  return (
    <div className={snippetStyles.div_three}>
        
          <ArrowBackIosIcon sx={{ fill: !'inherit', fontSize: "4vw",}}/>
        <div className={snippetStyles.editor}>
          <EditorRenderedSnippets articles={articles} />
        </div>
          <div className={snippetStyles.info_container}>
          <a className={snippetStyles.title} >{articles[4].fields.Title}</a>
          <a className={snippetStyles.description} >{articles[4].fields.description}</a>
          </div>
          <ArrowForwardIosIcon sx={{ fill: !'inherit', fontSize: "4vw",}}/>
      
    </div>
  )
}

export default gallery


export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/articles`)
  const articles = await res.json()

    return {
      props: {
        articles,
      },
    }
} 