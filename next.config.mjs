/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    /* The root layout lives at app/[locale]/layout.tsx, because the locale
       decides <html lang>. Next cannot render an ordinary not-found inside
       a root layout that sits in a dynamic segment, so an unmatched path
       falls back to its bare error document. global-not-found renders its
       own document, which is the way out. */
    globalNotFound: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            /* RFC 8288: points at the markdown form of whatever was just
               served, so a client can find it without negotiating. */
            key: 'Link',
            value: '</llms.txt>; rel="describedby"; type="text/plain"',
          },
        ],
      },
    ]
  },
}

export default nextConfig
