module.exports = {
  siteUrl: "https://hr-devlog.vercel.app/",
  exclude: ["/404"],
  generateRobotsTxt: true, // default: false, true 라고 설정해야 robots.txt 생성
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/404"],
      },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [`https://hr-devlog.vercel.app/server-sitemap.xml`],
  },
};
