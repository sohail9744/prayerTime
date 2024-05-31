/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_IMAGE: "http://54.160.190.5:1337", // Backend Image Url for frontend side
    // NEXTAUTH_URL: "http://54.160.190.5:3000",
    HOSTNAME: "http://54.160.190.5:1337", // Backend Hosted on this url
    // Server URL
    NEXTAUTH_URL: "https://main.d2d0x8dpvmgskk.amplifyapp.com",
    // Common URL 
    GOOGLE_MAPS_KEY: "AIzaSyD3QQH8b4zZn4CFuhxuZyksdwRRZVbOtWQ",
    NEXTAUTH_SECRET: "zO5TC/ir3qOHwafVy7Ss2zpohjemaVbGEIdYE3ELMDo=",
    DEV_API_TOKEN:
    "c154795a497a879ca4a044afbb1479621cb9aa9eb059f5e1dd3ba98d036338d00aad6d3d8e0208386da83aa913f6dcc35ccebfe2c6ee8f91995a30399ec16160f83c9b08071deec0d0c145fdfb4d0a0455f88fc05d0c21bbfeeafc82049d47efc8efc0296fc95eed124d4605e09462f7adca8f59e49b144d7fc155885bacbbb1", // Full access token for autharization
    LOCAL_DEV_API_TOKEN:
    "97283c93b3263a7af733c1356b4a3d4d08dd5924d82926502ce67e6f3eb245f211d36bb63270fc1b78902d5199f8c312e8053d7b838e8171b2e9c81ea9a9854ee0cf44823bd3600f30ec670c60edf9aba63a47018a2bfbc4af810e384b9aba3b9ab688ebaf6b0f4c9cb985db8144f1ce98f012b82320d6b24512734354b18b9b", // Local host full access token
  },
  trailingSlash: true
};

export default nextConfig;
