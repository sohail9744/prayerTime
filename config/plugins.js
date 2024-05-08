module.exports = () => ({
  "strapi-google-auth": {
    enabled: true,
  },
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "1d",
      },
    },
  },
});
