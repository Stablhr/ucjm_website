import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description }) {
  const siteName = 'UCJM Church'
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const desc =
    description ||
    'Unity in Christ Jesus Ministries — A community of faith, hope, and love. Join us for worship, Bible reading, and spiritual growth.'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  )
}
