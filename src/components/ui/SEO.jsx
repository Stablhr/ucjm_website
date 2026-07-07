import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, image }) {
  const siteName = 'UCJM Church'
  const siteUrl = 'https://ucjmwebsite.vercel.app'
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const desc =
    description ||
    'Unity in Christ Jesus Ministries — A community of faith, hope, and love. Join us for worship, Bible reading, and spiritual growth.'
  const ogImage = image || '/images/og-image.jpg'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={`${siteUrl}${window.location.pathname}`} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}${window.location.pathname}`} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
