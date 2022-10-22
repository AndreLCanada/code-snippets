import { articles } from '../../../data'

export default function handler({ query: { id } }, res) {
     const filtered = articles.filter((article) => article.id === id)

     if (filtered.length > 0) {
      res.status(200).json(filtered[0])
     } else {
      res.status(400).json({ message : `article with the id of ${id} could not be found` })
     }
}