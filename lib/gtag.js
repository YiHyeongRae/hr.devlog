export const pageview = (url) => {
  window.gtag("config", "G-PMSB1F57B3", {
    page_path: url,
  });
};
