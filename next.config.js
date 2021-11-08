module.exports = {
  reactStrictMode: true,
  PORT_URL:"http://localhost:3000"

  ,  async rewrites() {
        return [
          {
            source: 'https://next-firebase-auth1-qifsbz3ny-muzamil132.vercel.app/api:path*',
            destination: 'https://next-firebase-auth1-qifsbz3ny-muzamil132.vercel.app/:path*',
          },
        ]
      },
}
