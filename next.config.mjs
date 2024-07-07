/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_IMAGE: "https://bk.mosqtime.com", // Backend Image Url for frontend side
    HOSTNAME: "https://bk.mosqtime.com", // Backend Hosted on this url
    // NEXTAUTH_URL: "http://localhost:3000",
    // Server URL
    NEXTAUTH_URL: "https://mosqtime.com",
    // Common URL
    TIMEZONE_DB: "71KX7M87SUSB",
    NEXTAUTH_SECRET: "zO5TC/ir3qOHwafVy7Ss2zpohjemaVbGEIdYE3ELMDo=",
    DEV_API_TOKEN:
      "8b993029c1c45c24222b3439499d404bb8cc015f7efcf84749ad1ac08c1113154e73ea570d4fbc0c5ba561f213867588d2bd09675fb14003cfe1455c31b21c9286d44ff6b2c0b8d4f76390d20f75fe5750ba486e277f372d7172f8ff21805735e83c8a46c2fed5a795049f1ea618e2b7d7012aaeb8f2859a3a1938621a377791", // Full access token for autharization
    LOCAL_DEV_API_TOKEN:
      "97283c93b3263a7af733c1356b4a3d4d08dd5924d82926502ce67e6f3eb245f211d36bb63270fc1b78902d5199f8c312e8053d7b838e8171b2e9c81ea9a9854ee0cf44823bd3600f30ec670c60edf9aba63a47018a2bfbc4af810e384b9aba3b9ab688ebaf6b0f4c9cb985db8144f1ce98f012b82320d6b24512734354b18b9b", // Local host full access token
  },
  trailingSlash: false,
};

export default nextConfig;
