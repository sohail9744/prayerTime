export default function sitemap() {
    return [
      {
        url: 'https://mosqtime.com',
        lastModified: new Date(),
        priority: 1,
      },
      {
        url: 'https://mosqtime.com/api/auth/signin?csrf=true',
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: 'https://mosqtime.com/api/auth/signup?csrf=true',
        lastModified: new Date(),
        priority: 0.5,
      },
    ]
  }