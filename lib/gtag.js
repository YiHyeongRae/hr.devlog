export const pageview = (url) => {
  window.gtag("config", "G-YF2VYNR7J7", {
    page_path: url,
  });
};
