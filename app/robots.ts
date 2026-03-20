import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://portfolio-nnschinmayee07-8534s-projects.vercel.app/sitemap.xml',
  }
}
