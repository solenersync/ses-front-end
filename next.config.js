/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
},
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
}
