module.exports = [
  "strapi::logger",
  "strapi::errors",
 {
	name: "strapi::security",
	config: {
		contentSecurityPolicy: false,	
	},
 }, 
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      header: '*',
      origin: ["https://main.d39t7wzdrffcbl.amplifyapp.com", "http://localhost:3000", "http://54.160.190.5:1337"], // Add your Next.js app domain here
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
