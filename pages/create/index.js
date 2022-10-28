import React, { useEffect, useRef, useState, useContext } from 'react'
import Head from 'next/head'
import { server } from '../../config'
import Airtable from 'airtable';
import EditorRendered from '../../components/EditorCreate';
import createStyles from '../../styles/Create.module.css';
import { Context } from '../../components/Layout';
import { CommentsDisabledOutlined } from '@mui/icons-material';
import { ListItem } from '@mui/material';



export default function Create({ articles }) {
  const base = new Airtable({apiKey: process.env.NEXT_PUBLIC_DB_KEY}).base(process.env.NEXT_PUBLIC_DB_BASE);
  let preload = ""
  const form = useRef(null);
  const [codeValue, setCodeValue] = useState();
  const [toggle, setToggle] = useState();
  const { typeOfCode, loadCode } = useContext(Context)
  const codeFile = articles.filter(item => item.Title === typeOfCode)
  
  preload = codeFile[0].details

  const handleSubmit = () => {
   
      // Save Code Snippet
      base('code').create([
        {
          "fields": {
            "Title": form.current[0].value,
            "description": form.current[1].value,
            "details": form.details ? form.details : "[Uh oh, looks like you didn't save something new!]",
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

     // trigger Success Message -> setTimeout for 5 seconds -> hide Success Message -> reload page
      setToggle(true);
      setTimeout(() => {window.location.reload();}, 3000);
    };

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
           <textarea className={createStyles.input} type="text" rows="2" id="title" value={form.title}></textarea>
        </div>
        <div className={createStyles.descriptionDiv}>
           <label className={createStyles.label} for="description" >code description:</label>
           <textarea className={createStyles.description} type="text" rows="4" id="description" value={form.description}></textarea>
        </div>
      </form>
     <div className={createStyles.editor}>
       <EditorRendered articles={articles} preloadCode={preload} setCodeValue={setCodeValue}/>
    </div>
    <div className={createStyles.buttons}>
      <button className={createStyles.button} type="button" onClick={handleSubmit} >Save</button>
      <button className={createStyles.button} type="button" onClick={handleDiscard}>Discard</button>
    </div> 
    { toggle ? <div className={createStyles.success}>Snippet Saved!</div> : null} 
  </div>
</div>)

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