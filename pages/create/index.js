import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { server } from '../../config'
import ArticleList from '../../components/ArticleList';
import Airtable from 'airtable';
import EditorRendered from '../../components/Editor';
import createStyles from '../../styles/Create.module.css';
import { base } from '../api/articles';



export default function Create({ articles }) {
  const [postBody, setPostBody] = React.useState("");

  const form = useRef(null);
  const [codeValue, setCodeValue] = useState();

    const handleSubmit = () => {
   //title
      console.log(form.current[0].value)
    //description
      console.log(form.current[1].value) 
      console.log(form.details)

      base('code').create([
        {
          "fields": {
            "Title": form.current[0].value,
            "description": form.current[1].value,
            "details": form.details,
            "type": [
              "function"
            ]
          }
        }
      ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          console.log(record.getId());
        });
      });

    }

    const handleDiscard = () => {
      window.location.reload();
    }

    useEffect(() => {
      form.details = codeValue
    }, [codeValue])

   return (
    <div >
    <Head>
       <title>codeSnippets</title>
       <meta name="keywords" content="web development, programming" />
    </Head>
    <div className={createStyles.container}>
    <form className={createStyles.form} ref={form}>
        <div className={createStyles.titleDiv}>
           <label className={createStyles.label} for="title">snippet name:</label>
           <textarea className={createStyles.input} type="text" cols="40" id="title" value={form.title}></textarea>
        </div>
        <div className={createStyles.descriptionDiv}>
           <label className={createStyles.label} for="description" >code description:</label>
           <textarea className={createStyles.description} type="text" rows="4" id="description" value={form.description}></textarea>
        </div>
      </form>
     <div className={createStyles.editor}>
       <EditorRendered articles={articles} setCodeValue={setCodeValue} />
    </div>
    <div className={createStyles.buttons}>
      <button className={createStyles.button} type="button" onClick={handleSubmit}>Save</button>
      <button className={createStyles.button} type="button" onClick={handleDiscard}>Discard</button>
    </div> 
  </div>
</div>);
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