import Airtable from 'airtable';

export const base = new Airtable({apiKey: process.env.NEXT_PUBLIC_DB_KEY }).base( process.env.NEXT_PUBLIC_DB_BASE );


export default function handler(req, res) {
  base('code')
    .select({ view: "Grid view"} )
    .eachPage((records, fetchNextPage) => {
    
        
        fetchNextPage()
        res.status(200).json(records)
    })
}

