import React, {useEffect, useState, useContext} from 'react'
import Head from 'next/head'
import Airtable from 'airtable';
import EditorRenderedHome from '../components/Editor';
import homeStyles from '../styles/Home.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ReactDOM from "react-dom/client";
import { Context } from '../components/Layout';
 import Link from 'next/link';

export default function Home({ articles, arrayLength }) {
  const [toggle, setToggle] = useState(0);
  const [indexOfCode, setIndexOfCode] = useState(1) 
  const contextType = Context
  const value = articles[1].details
  const { typeOfCode, loadCode } = useContext(Context)
 
  

  const handleComponentClick = () => {
      loadCode("Component")
  }

  const handleFunctionClick = () => {
    loadCode("Function")  }

  const handleClassClick = () => {
    loadCode("Class")  }

  const handleForwardClick = () => {
    arrayLength > indexOfCode  && setIndexOfCode(indexOfCode + 1);
  }

  const handleBackwardClick = () => {
    indexOfCode > 0 && setIndexOfCode(indexOfCode - 1);
  }

  

  return (
    <div className={homeStyles.centerContainer}>
    
    <Head>
       <title>codeSnippets</title>
       <meta name="keywords" content="web development, programming" />
       <script>
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('phc_Yo7GjrzPP4mb19I5muBpXo11ViCfbQMbBGwZIvAKCWe',{api_host:'https://app.posthog.com'})
        </script>
    </Head>
  
    <div className={homeStyles.container}>
      <div className={homeStyles.div_container}>
        <div className={homeStyles.div_one}>
          <a className={homeStyles.btn_shine} target="_blank">codeSnippets: <br></br>{articles ? articles.length : null}</a>
        </div>
        
        <div className={homeStyles.div_two}>
          <div className={homeStyles.dropdown}>
            <button className={homeStyles.dropdown}>Select Type:</button>
            <div className={homeStyles.dropdown_content}>
             <a onClick={handleComponentClick} >Component</a>
              <a onClick={handleFunctionClick}  >Function</a>
              <a onClick={handleClassClick}  >Class</a>
            </div>
          </div>
          <div className={homeStyles.typeCode}>{typeOfCode}</div>
          <Link href='/create'><div className={homeStyles.create_button}> Create</div></Link>
        </div>
      </div>
      <div className={homeStyles.div_three}>
          <ArrowBackIosIcon onClick={handleBackwardClick} sx={{ fill: !'inherit', fontSize: "6vw",}}/>
        <div className={homeStyles.editor}>
          <EditorRenderedHome indexOfCode={indexOfCode} articles={articles} /> 
        </div>
          <div className={homeStyles.info_container}>
          <a className={homeStyles.title} >{articles[indexOfCode].Title}</a>
          <a className={homeStyles.description}> {articles[indexOfCode].description}</a>
          </div>
          <ArrowForwardIosIcon onClick={handleForwardClick} sx={{ fill: !'inherit', fontSize: "6vw",}}/>
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
  const arrayLength = articles.length - 1;
  return {
    props: {
      articles,
      arrayLength,
    },
  };
}

