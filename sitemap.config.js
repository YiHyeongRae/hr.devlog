module.exports = {
  siteUrl: "https://example.com",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://example.com/server-sitemap.xml", // <==== Add here
    ],
  },
};
