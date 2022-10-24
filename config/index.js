const dev = process.env.NODE_ENV !== 'production'
export const server = dev ? 'http://localhost:3000' : "https://code-snippets-lacke-repo.vercel.app"