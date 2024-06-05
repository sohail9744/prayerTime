/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_IMAGE: "https://bk.mosqtime.com", // Backend Image Url for frontend side
    // NEXTAUTH_URL: "http://localhost:3000",
    HOSTNAME: "https://bk.mosqtime.com", // Backend Hosted on this url
    // Server URL
    // NEXTAUTH_URL: "https://main.d2d0x8dpvmgskk.amplifyapp.com",
    NEXTAUTH_URL: "https://mosqtime.com",
    // Common URL 
    GOOGLE_MAPS_KEY: "AIzaSyD3QQH8b4zZn4CFuhxuZyksdwRRZVbOtWQ",
    NEXTAUTH_SECRET: "zO5TC/ir3qOHwafVy7Ss2zpohjemaVbGEIdYE3ELMDo=",
    DEV_API_TOKEN:
    "960762e04f7e0fc1d02a6ccd4de4278b02caae4ef638dc35f98663ae913f333ffa25512ff05f769aeddf56369c62595ee4876abcf63c04dccd0f7492bb677bd68f5eb0768fbb08ee1ffd1017fc39189ab23f2626cbd3015b723eb0310c3814e25bc21a137fe92d6721a25fae3d861b52ae4e3628ae222edd59e004ce3ecd62fd", // Full access token for autharization
    LOCAL_DEV_API_TOKEN:
    "97283c93b3263a7af733c1356b4a3d4d08dd5924d82926502ce67e6f3eb245f211d36bb63270fc1b78902d5199f8c312e8053d7b838e8171b2e9c81ea9a9854ee0cf44823bd3600f30ec670c60edf9aba63a47018a2bfbc4af810e384b9aba3b9ab688ebaf6b0f4c9cb985db8144f1ce98f012b82320d6b24512734354b18b9b", // Local host full access token
  },
  trailingSlash: true
};

export default nextConfig;
