import Airtable from 'airtable';

const base = new Airtable({apiKey: 'keyoouBn1N5Bhf3rI'}).base('appvb64iqCOaASqZj');

export default function handler(req, res) {
  base('code')
    .select({ view: "Grid view"} )
    .eachPage((records, fetchNextPage) => {
    
        
        fetchNextPage()
        res.status(200).json(records)
    })
}